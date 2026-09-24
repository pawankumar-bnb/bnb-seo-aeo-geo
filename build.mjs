#!/usr/bin/env node
// Writes both entry points from one shell so they cannot drift apart:
//   index.html    — standalone document, what GitHub Pages serves
//   artifact.html — same markup without a document skeleton (the Artifact host adds one)
//
//   node build.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const shell = readFileSync(join(here, 'shell.html'), 'utf8').trim();

const TITLE = 'Brick&Bolt Snag List';
const DESC =
  "A survey of bricknbolt.com laid out as a builder's snag list - every SEO and " +
  'AEO/GEO pointer with what was measured, why it matters and what to do.';

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">`;

const SCRIPTS = `<script src="data.js"></script>\n<script src="auth.js"></script>\n<script src="app.js"></script>`;

writeFileSync(join(here, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE.replace('&', '&amp;')}</title>
<meta name="description" content="${DESC}">
${FONTS}
<link rel="stylesheet" href="app.css">
<style>img{max-width:100%} [hidden]{display:none!important}</style>
</head>
<body>
${shell}
${SCRIPTS}
</body>
</html>
`);

writeFileSync(join(here, 'artifact.html'), `<title>${TITLE}</title>
${FONTS}
<link rel="stylesheet" href="app.css">

${shell}
${SCRIPTS}
`);

console.log('built index.html + artifact.html from shell.html');
