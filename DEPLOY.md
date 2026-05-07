# Deploying monderahul.in

This site is plain HTML/CSS/JS — no build step. The plan is:

1. Preview locally
2. Push to GitHub (`rmonde/my-profile`)
3. Enable GitHub Pages
4. Point `monderahul.in` (GoDaddy) at GitHub Pages

---

## 1. Preview locally

From this folder:

```bash
# Python (already on macOS)
python3 -m http.server 8080
```

Open <http://localhost:8080>. Click around: nav links should jump-scroll, the **Download Resume** button should download `Resume-Rahul_Monde.pdf`, and the skill dots should render. Resize the window — the layout should reflow at ~880px and ~720px.

If anything looks off, edit `styles.css` / `index.html` and refresh (no rebuild).

---

## 2. Push to GitHub

```bash
cd /Users/rahulpmonde/Documents/Rahul-study/my-profile
git status
git add index.html styles.css script.js Resume-Rahul_Monde.pdf DEPLOY.md
git commit -m "Profile site v1: hero, about, skills, experience, projects"
git push origin main
```

---

## 3. Enable GitHub Pages

On GitHub:

1. Go to **github.com/rmonde/my-profile → Settings → Pages**.
2. **Source**: *Deploy from a branch*.
3. **Branch**: `main`, **folder**: `/ (root)`. Save.
4. Wait \~30–60 s. The page reloads showing `Your site is live at https://rmonde.github.io/my-profile/` (or similar).
5. **Custom domain**: the box should already show `www.monderahul.in` (your `CNAME` file controls that). If not, type it in and save.
6. Tick **Enforce HTTPS** once the box is enabled (5–15 min after DNS resolves).

---

## 4. DNS at GoDaddy

Goal: `www.monderahul.in` → GitHub Pages, and the apex `monderahul.in` → redirect to `www`.

### Sign in
**GoDaddy → My Products → DNS** for `monderahul.in`. (Or `https://dcc.godaddy.com/domains/`.)

### Records to set

Delete any old `A` / `CNAME` records pointing to GoDaddy parking, then add these. (Hostnames in GoDaddy: `@` = apex, `www` = the www subdomain.)

| Type   | Host  | Value                              | TTL     |
|--------|-------|------------------------------------|---------|
| CNAME  | `www` | `rmonde.github.io.`                | 1 Hour  |
| A      | `@`   | `185.199.108.153`                  | 1 Hour  |
| A      | `@`   | `185.199.109.153`                  | 1 Hour  |
| A      | `@`   | `185.199.110.153`                  | 1 Hour  |
| A      | `@`   | `185.199.111.153`                  | 1 Hour  |

The four A records are GitHub Pages' apex IPs (per GitHub's docs). The CNAME on `www` is what your `CNAME` file in this repo declares.

> If you'd rather use IPv6 too (optional), also add four AAAA records on `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

### Verify

DNS propagation usually takes 5 minutes to a few hours.

```bash
# Should resolve to a 185.199.x.153 address
dig +short monderahul.in
# Should resolve to rmonde.github.io
dig +short www.monderahul.in
```

When both look right, browse to <https://www.monderahul.in> — you should see the site.

### Force HTTPS

Back on GitHub → Settings → Pages, tick **Enforce HTTPS** once it's selectable. GitHub provisions a Let's Encrypt cert automatically.

---

## Updating the site later

Every push to `main` redeploys automatically:

```bash
# Edit index.html / styles.css / script.js / etc.
git add -A
git commit -m "tweak hero copy"
git push
```

---

## Things to swap in when you're ready

- **Profile photo**: replace the SVG monogram in `index.html` (look for `<div class="avatar">`) with `<img src="me.jpg" alt="Rahul Monde">` after dropping `me.jpg` next to `index.html`.
- **GitHub username**: footer + Contact section currently link to `github.com/rmonde`. Update if needed.
- **Project cards**: edit the six `<article class="project-card">` blocks in `index.html` as you ship more work.
- **Skills**: update the `SKILLS` object near the top of `script.js`.
- **Resume**: drop a new `Resume-Rahul_Monde.pdf` in this folder — the download button picks it up automatically.

---

## Resume PDF — small fix to consider

Your current resume PDF says **"Google Apogee"** twice. The product is **Google Apigee** (API management). Worth fixing in the source doc before too many recruiters see it.
