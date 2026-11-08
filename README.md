# Puppy Bowl Roster App

> **Project status:** The repository name and page title refer to Space Invaders, but the current JavaScript is for a Puppy Bowl roster app. The checked-in page and script are not yet wired together, so the roster app does not currently run as intended.

The JavaScript is set up to use the Puppy Bowl API for a course cohort. It is intended to fetch and display players, show player details, add players, and remove players.

## Current files

```text
.
├── index.html   # Current page markup; title says "Space Invaders"
├── index.js     # Puppy Bowl API requests and roster logic
└── style.css    # Player-card styling
```

## Known issues

- `index.js` looks for `all-players-container` and `new-player-form`, but those elements are missing from `index.html`.
- `index.html` links to `Style.css`, while the stylesheet is named `style.css`. This case mismatch prevents the stylesheet from loading on case-sensitive systems.
- The JavaScript uses the Puppy Bowl API cohort `2302-ACC-PT-WEB-PT-B`; API availability and cohort data are required for roster requests to work.

## Technologies

- HTML
- CSS
- JavaScript
- Puppy Bowl API

This repository is a work in progress and a place to practice JavaScript, DOM manipulation, and API requests.
