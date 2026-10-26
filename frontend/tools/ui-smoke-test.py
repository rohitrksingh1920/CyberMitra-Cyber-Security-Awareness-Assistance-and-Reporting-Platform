"""
CyberMitra UI smoke test (real browser, no backend needed)

Checks the interactive features end to end: theme toggle + persistence, the search
palette, the "what happened?" helper (incl. prefilling the FIR form), the red-flag
hunt, case-file accordion, quiz keyboard shortcuts + community stats line, click-to-copy,
and that Hindi mode doesn't leak English.

    pip install playwright && playwright install chromium
    npm run build
    python tools/ui-smoke-test.py            # tests ./dist
    python tools/ui-smoke-test.py path/to/dist
"""
import subprocess, sys, time
from playwright.sync_api import sync_playwright

DIST = sys.argv[1] if len(sys.argv) > 1 else "dist"
PORT = 4597
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--directory", DIST],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
results, errors, posts = [], [], []


def check(name, cond, extra=""):
    results.append(bool(cond))
    print(("PASS  " if cond else "FAIL  ") + name, extra)


def calm(pg):
    """Hide the first-visit chooser and turn off smooth scrolling so tests are deterministic."""
    pg.evaluate("document.querySelector('.cybermitra-landing').classList.remove('show');"
                "document.documentElement.style.scrollBehavior='auto'")


try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        pg = browser.new_context(viewport={"width": 1440, "height": 900}).new_page()
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

        def fake_api(route):                      # stands in for the FastAPI backend
            if route.request.method == "POST":
                posts.append(route.request.post_data)
            body = '{"attempts":12,"average_score_pct":68.0}' if "quiz/stats" in route.request.url else '{"message":"ok"}'
            route.fulfill(status=200, content_type="application/json", body=body)
        pg.route("**/api/quiz/**", fake_api)

        pg.goto(f"http://127.0.0.1:{PORT}/"); pg.wait_for_timeout(1500)
        check("first-visit chooser is shown", pg.evaluate("document.getElementById('cybermitra-landing').classList.contains('show')"))
        calm(pg)

        # theme
        before = pg.evaluate("document.documentElement.dataset.theme")
        pg.click("#theme-toggle"); pg.wait_for_timeout(900)
        after = pg.evaluate("document.documentElement.dataset.theme")
        check("theme toggles", before != after, f"{before} -> {after}")
        check("choice is saved", pg.evaluate("localStorage.getItem('cybermitra-theme')") == after)
        pg.reload(); pg.wait_for_timeout(900); calm(pg)
        check("choice survives a reload", pg.evaluate("document.documentElement.dataset.theme") == after)
        pg.click("#theme-toggle"); pg.wait_for_timeout(900)

        # search palette
        pg.keyboard.press("Control+k"); pg.wait_for_timeout(300)
        check("Ctrl+K opens search", pg.evaluate("document.getElementById('palette').classList.contains('show')"))
        pg.keyboard.type("otp"); pg.wait_for_timeout(250)
        check("search finds OTP content", pg.evaluate("document.querySelectorAll('.palette-item').length") >= 2)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
        check("Esc closes search", not pg.evaluate("document.getElementById('palette').classList.contains('show')"))

        # triage helper
        pg.evaluate("document.getElementById('help').scrollIntoView()"); pg.wait_for_timeout(400)
        pg.click("[data-scen='money']"); pg.wait_for_timeout(250)
        pg.click("[data-when='hour']"); pg.wait_for_timeout(250)
        check("checklist is generated", pg.evaluate("document.querySelectorAll('.plan-item').length") >= 5)
        check("urgent 1930 banner for fresh money loss", pg.evaluate("!!document.querySelector('.triage-urgent a[href=\"tel:1930\"]')"))
        pg.click(".plan-item >> nth=0"); pg.wait_for_timeout(150)
        check("steps can be ticked off", pg.evaluate("document.querySelector('.plan-item').classList.contains('done')"))
        pg.click("[data-act='draft']"); pg.wait_for_timeout(600)
        check("complaint form opens prefilled", "Financial" in pg.evaluate("document.getElementById('cyber-fir-type').value")
              and "lost money" in pg.evaluate("document.getElementById('cyber-fir-desc').value").lower())
        pg.evaluate("closeCyberPopup()")

        # red-flag hunt
        pg.evaluate("document.getElementById('hunt').scrollIntoView()"); pg.wait_for_timeout(300)
        flags = pg.evaluate("document.querySelectorAll('.flag-chip[data-flag=\"1\"]').length")
        for i in range(flags):
            pg.click(f".flag-chip[data-flag='1'] >> nth={i}")
        pg.click(".flag-chip[data-flag='0'] >> nth=0")
        pg.click("[data-hunt='check']"); pg.wait_for_timeout(250)
        check("hunt marks hits and false alarms", pg.evaluate("document.querySelectorAll('.flag-chip.hit').length") == flags
              and pg.evaluate("document.querySelectorAll('.flag-chip.false').length") == 1)

        # case file accordion
        pg.evaluate("document.getElementById('learn').scrollIntoView()"); pg.wait_for_timeout(300)
        pg.click("#exhibit-1 .exhibit-head"); pg.wait_for_timeout(600)
        check("case file opens (+ aria-expanded)", pg.evaluate("document.getElementById('exhibit-1').classList.contains('open')")
              and pg.get_attribute("#exhibit-1 .exhibit-head", "aria-expanded") == "true")

        # quiz via keyboard + community stats
        pg.evaluate("document.activeElement && document.activeElement.blur(); document.getElementById('quiz').scrollIntoView()"); pg.wait_for_timeout(500)
        for _ in range(5):
            pg.keyboard.press("b"); pg.wait_for_timeout(250); pg.keyboard.press("Enter"); pg.wait_for_timeout(300)
        pg.wait_for_timeout(500)
        check("quiz completes from the keyboard", pg.evaluate("document.getElementById('quiz-result').classList.contains('show')"))
        check("score is posted + community average shown", len(posts) >= 1 and "12 attempts" in pg.evaluate("(document.getElementById('quiz-community')||{}).textContent||''"))

        # copy + language
        pg.evaluate("document.getElementById('contact-table').scrollIntoView({block:'center'})"); pg.wait_for_timeout(300)
        pg.click(".copyable >> nth=0"); pg.wait_for_timeout(250)
        check("click-to-copy shows a toast", pg.evaluate("!!document.querySelector('.toast')"))
        pg.evaluate("window.scrollTo(0,0)"); pg.click("#btn-hi"); pg.wait_for_timeout(400)
        check("Hindi mode hides every English string in the hero",
              pg.evaluate("[...document.querySelectorAll('.hero .en')].filter(e=>e.offsetParent!==null).length") == 0)

        check("no console / page errors", not errors, str(errors[:3]))
        browser.close()
finally:
    srv.terminate()

print(f"\n{sum(results)}/{len(results)} checks passed")
sys.exit(0 if all(results) else 1)
