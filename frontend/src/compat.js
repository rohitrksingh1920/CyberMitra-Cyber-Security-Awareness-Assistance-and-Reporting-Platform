// Compatibility layer for the original static HTML interactions.
// Kept intentionally small: the original functions are exposed by global eval.
export function ensureCyberSOSGlobals() {
  if (!window.currentLang) {
    window.currentLang = () =>
      document.documentElement.getAttribute("data-lang") || "en";
  }
}
