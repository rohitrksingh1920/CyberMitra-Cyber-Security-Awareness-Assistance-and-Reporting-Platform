"""
Regenerates the theme-able logo masks from a logo PNG.

    pip install pillow numpy
    python tools/make-logo-masks.py public/cybermitra-logo.png public

Output:  <outdir>/logo-ink-mask.png     (wordmark + heavy rule)
         <outdir>/logo-copper-mask.png  (the "CYBER SECURITY SOLUTIONS" line)

Both are white PNGs whose *alpha channel* is the shape; CSS paints them with --ink and the
copper gradient (see .logo in src/styles/layout.css), so the logo follows light/dark mode.
Assumes the artwork is dark ink + a copper subtitle on a light background (as in the current logo).
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, outdir = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert("RGB")).astype(float)
h, w, _ = a.shape
lum = a.min(axis=2)                                   # ink ≈ 0, copper ≈ 80, paper ≈ 235
bg = np.array(Image.fromarray(lum.astype("uint8")).filter(ImageFilter.MaxFilter(41))
              .filter(ImageFilter.GaussianBlur(6))).astype(float)
bg = np.maximum(bg, 200)                              # local paper brightness (handles uneven lighting)

copper_rows = ((a[:, :, 0] - a[:, :, 2]) > 45).mean(axis=1)
split = next(y for y in range(h) if copper_rows[y] > 0.05)   # first row of the copper subtitle


def mask(y0, y1, fg):
    m = np.zeros((h, w))
    m[y0:y1] = np.clip((bg[y0:y1] - lum[y0:y1]) / (bg[y0:y1] - fg), 0, 1)
    return m


for name, m in (("logo-ink-mask.png", mask(0, split - 2, 1)), ("logo-copper-mask.png", mask(split - 2, h, 84))):
    out = np.zeros((h, w, 4), dtype="uint8")
    out[..., :3] = 255
    out[..., 3] = (m * 255).astype("uint8")
    Image.fromarray(out, "RGBA").save(f"{outdir}/{name}", optimize=True)
    print("wrote", f"{outdir}/{name}")
