# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project overview

This is a static study site ("글로벌인 일본IT과정 한자단어장") used to practice
Japanese kanji vocabulary. It is a personal learning archive, not a production
app. The UI is primarily in Korean, content is Japanese, and there are no
package managers, build scripts, linters, or tests — pages are edited by hand
and opened directly in a browser (or served from a JSP container for the
quiz-generation flow).

Two companion repos are referenced in `README.md`:
- Prototype: `https://github.com/sgmis20/kanji`
- Versioned backup: `https://github.com/spero61/kanjiquiz`

## Repository layout

```
/                       Root = GitHub Pages-style static site
├── index.html          Landing page with calendar + list of daily quiz pages
├── MMDD.html           Daily vocabulary pages (e.g. 0729.html = 7월 29일)
├── templateOnair.html  Template used when creating a new daily page
├── kanjiquiz.html      Static kanji quiz page
├── kanjiquizDemo.html  DB-free quiz demo (uses javascript/kanjiData.js)
├── kanjiquiz.jsp       JSP entry for dynamic quiz (prototype)
├── kanjiquizNew.jsp    Form: select page range + question count
├── kanjiquizMariaDB.jsp  Renders a quiz from MariaDB (current)
├── kanjiquizOracleDB.jsp Renders a quiz from Oracle (legacy)
├── server/             Python/Flask quiz backend (replaces JSP flow)
│   ├── app.py             Routes: /quiz, /quiz/generate, /api/words, /api/pages
│   ├── kanji_data.py      Single source of truth: all vocab (26 dates, 1044 words)
│   ├── generate_js_data.py  Exports kanji_data.py → javascript/kanjiData.js
│   └── templates/         Jinja2: base.html + quiz_form / quiz_result
├── browser.html, filePath.html  Small utility pages
├── css/                All stylesheets; versioned via ?v=... query strings
├── javascript/         Small vanilla-JS helpers (no bundler)
│   ├── calendar.js        Calendar on index.html; routes date click → MMDD.html
│   ├── toggle.js          Hide/show yomigana / 한글뜻 / kanji on daily pages
│   ├── toggleLyrics.js    Same pattern for /lyrics pages
│   ├── collapsibles.js    Generic accordion behavior
│   ├── getString.js       Dev helper: serializes table cells to console
│   ├── kanjiData.js       GENERATED from server/kanji_data.py — do not hand-edit
│   ├── quizCards.js       Shared quiz-card reveal/toggle (demo + Flask result page)
│   └── quizDemo.js        kanjiquizDemo.html logic (form build, shuffle, render)
├── kakunin/            "확인" pages — consolidated review quizzes per week
├── lyrics/             J-pop lyric pages with Korean translation toggle
├── globalin/           Secondary kanji series; uses toggleGlobalin.js
├── codeshare/          Snippet pages (uses highlight.js)
├── highlight/          Vendored highlight.js (do not modify)
├── media/              PNG/GIF assets used across pages
├── miniproject/        JSP practice sandbox (ignored subpaths in .gitignore)
└── README.md           Changelog-style version history (Korean)
```

## How the pieces fit together

### Daily kanji pages (`MMDD.html`)

Each dated file is a self-contained page built from `templateOnair.html`. The
structure that `javascript/toggle.js` depends on is a strict contract — keep it
when adding pages:

- `<nav>` contains `.btn1` … `.btn4` anchors (each toggles a specific class).
- Each kanji row group uses three `<tr>`s with these cell classes:
  - `.kanji` — the kanji character cell (often with `rowspan="3"`)
  - `.kanjiyomi` — on/kun readings
  - `.yomigana` — reading of the full word
  - `.tango` — the Japanese word
  - `.kor` — Korean meaning
- `toggle.js` toggles `.toggled` on `.yomigana`/`.kor` and `.kanjitoggled` on
  `.title, .kanji, .kanjiyomi, .tango`. Adding new pages without these class
  names will silently break the hide/show buttons.

Anchors `#frontpage` / `#backpage` are targeted by the in-page navigation, so
preserve those IDs when editing.

### Landing page (`index.html` + `calendar.js`)

`index.html` is hand-maintained — when a new `MMDD.html` is added, add a new
`<tr>` under the appropriate `초급한자테스트` table and update the "마지막
한자퀴즈" block at the top. `javascript/calendar.js` renders the calendar and
uses the selected date to navigate to `./MMDD.html`, so file names must follow
the zero-padded `MMDD.html` convention.

### Kakunin review pages (`kakunin/kakuninNN.html`)

Weekly review quizzes. `index.html` links numbered rows (`1`, `2`, …) in the
left column of each test table to these files.

### JSP quiz generator

Flow: `kanjiquizNew.jsp` (form) → POSTs to `kanjiquizMariaDB.jsp` (or the
Oracle variant) which calls `kanjiquizMariaDB.StaticSelect` to pull rows, then
renders a table with `.yomigana` / `.tango` / `.korMeaning` cells and an inline
`.btnAnswer` show/hide script. The Java classes themselves are not in this
repo — `/build/`, `/bin/`, `target/`, `WEB-INF/` are all gitignored and the
deployment is external (`http://yorusung.cafe24.com/...`).

When editing JSP:
- `numOfQuestion` must be a multiple of 5 (the rendering loop iterates in
  groups of 5, see `kanjiquizMariaDB.jsp:95-117`).
- Page numbers are split via `Math.log10` branching; watch for edge cases when
  adding values with unusual digit counts (e.g. the `101012` entry in
  `kanjiquizNew.jsp` is almost certainly a typo for `101102`).

### Python quiz backend and static demo

`server/kanji_data.py` is the single source of truth for vocabulary. The Flask
app (`server/app.py`, run with `cd server && python3 app.py`) serves the quiz
at `/quiz` and JSON at `/api/words` / `/api/pages`. The static demo
(`kanjiquizDemo.html`) needs no server: it loads `javascript/kanjiData.js`,
which is **generated** — after editing `kanji_data.py`, regenerate it with
`cd server && python3 generate_js_data.py`. Both UIs share
`css/kanjiquizDemo.css` and `javascript/quizCards.js` (card markup contract:
`.quizCard` containing `.qNum` / `.kor` / `.tango` / `.yomigana`; reveal state
is the `.revealed` class).

### Lyrics and globalin

`lyrics/` pages rely on `toggleLyrics.js` and the class `koreanLyrics`.
`globalin/` pages rely on `globalin/toggleGlobalin.js`, which expects global
`left01…left15` / `right01…right15` variables declared inline per page plus
`#tangoToYomigana` / `#yomiganaToTango` list containers and
`.toggleLeft` / `.toggleRight` / `.toggleAll` buttons.

## Conventions

- **Language:** UI and comments are in Korean; content is Japanese. Keep
  existing language — do not translate strings that are user-facing.
- **File names:** lower-case, zero-padded dates (`MMDD.html`, `kakuninNN.html`).
- **CSS cache busting:** stylesheets are linked with `?v=1.x` query strings.
  Bump the version when changing a CSS file so browsers pick up the new file.
- **No build step:** edit HTML/CSS/JS directly. Do not introduce bundlers,
  TypeScript, frameworks, npm, or formatters unless explicitly asked.
- **Vanilla JS only.** No jQuery (the commented-out snippet in `toggle.js` is
  intentionally dead). Use classList + querySelectorAll patterns already in use.
- **Vendor code:** `highlight/` is an upstream copy of highlight.js; don't edit
  it, and don't run linters/formatters over it.
- **Indentation:** files mix 2-space (most JS/HTML) and tab indentation (JSP).
  Match the surrounding file — do not reformat existing files wholesale.
- **External links** to `kaku-navi.com` per kanji and `ja.dict.naver.com` from
  clickable words are part of the UX; preserve them when editing rows.

## Editing workflow

- Adding a new daily page: copy `templateOnair.html` → `MMDD.html`, fill in the
  table, then add navigation entries in `index.html` (both the "마지막
  한자퀴즈" block and the correct `초급한자테스트 NN` table).
- Previewing: open the file in a browser. There is no dev server, hot reload,
  or test suite. Confirm the `btn1`–`btn4` toggles still work after edits —
  they are the main interactive feature.
- There are **no** automated tests, linters, or CI. Do not invent commands
  that don't exist; if you can't visually verify a UI change, say so.

## .gitignore notes

Do not commit anything under `archives/`, `hodgepodge/`, `WEB-INF/`, `build/`,
`bin/`, `target/`, `miniproject/practice/images/`, or `hyogeun/`. Do not
commit `*.class`, `*.jar`, `*.war`, `*.ear`, `*.db`, `*.tmp`, `*.bak`, or
Eclipse project files (`.project`, `.classpath`, `.settings/`, etc.).

## Git / branch policy for AI assistants

- Feature branch for automated assistants is
  `claude/add-claude-documentation-Xqnil` (current task). Develop here; do not
  push to other branches without explicit permission.
- Never create a PR unless the user asks for one.
- Prefer small, scoped edits — this repo is a personal archive and large
  refactors will conflict with the owner's manual authoring workflow.
