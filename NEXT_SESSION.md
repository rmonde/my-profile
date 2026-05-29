# Next session — pick up here

> Note for Claude: read this file at the start of the next conversation and remind Rahul about the pending item below.

## Pending work

**Expand the certifications section to better highlight Rahul's proficiency.**

Last session, Rahul approved the new ATS-optimized resume (`Resume-Rahul_Monde.ATS.docx` / `.pdf`) and the polished profile site at https://www.monderahul.in. The site already has a Certifications section with:

- Microsoft AI-102 — in progress, target 2026
- Google Cloud — Generative AI — completed
- CKA — previously certified

Rahul mentioned wanting to **expand this** but had to head out before we discussed specifics.

### Questions to ask Rahul at the start of the next session

1. Which certifications should be added — anything not yet listed? (Old Azure / AWS / GCP certs? Vendor trainings? Internal Globant certifications?)
2. For each cert: does he want issue dates, credential IDs, and Credly badge images shown?
3. Should this be the same expansion on **both** the website and the `.docx` resume, or just one of them?
4. Does he want a separate "Trainings & Learning Paths" section for non-cert coursework?

### Files that would need updating

- `index.html` — the `<section id="certifications">` block and possibly the `.cert-grid` styles in `styles.css` if we add badge images
- `Resume-Rahul_Monde.ATS.docx` — regenerate via `node build_resume.js` after editing the `certs` array in `build_resume.js`

---

## Reference: what shipped last session

| Asset | Status |
|---|---|
| Profile site live at https://www.monderahul.in | ✅ deployed via GitHub Pages |
| Favicon (16/32/180 + .ico) | ✅ |
| Open Graph image (`og.jpg`, 1200×630) | ✅ |
| GitHub link in footer | ✅ |
| Hero photo (HEIC → JPEG converted) | ✅ |
| `Resume-Rahul_Monde.pdf` — visually patched Apogee→Apigee | ⚠ visual only; source-doc fix still recommended |
| `Resume-Rahul_Monde.ATS.docx` + `.ATS.pdf` — single-column ATS-optimized | ✅ 94% keyword match, 803 words |

ATS score went from ~66/100 → ~92/100 between resume versions.
