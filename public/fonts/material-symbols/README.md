# Material Symbols – Self-Hosted Font (GDPR Compliance)

## Why self-hosted?
Loading fonts from `fonts.googleapis.com` transfers the visitor's IP address to Google
servers in the USA (Art. 44 GDPR / LG München I, Urt. v. 20.01.2022 – 3 O 17493/20).
Self-hosting eliminates this third-party data transfer entirely.

## How to download the font file

Run ONE of these commands in this directory:

### Option A – npm (recommended)
```bash
npx google-fonts-helper --family "Material+Symbols+Outlined" --subsets latin --output .
```

### Option B – curl (exact file used by the site)
```bash
curl -L "https://fonts.gstatic.com/s/materialsymbolsoutlined/v220/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MbikZmdWAbKXiCgjvfPtYl.woff2" \
  -o material-symbols-outlined.woff2
```

### Option C – Node script
```js
const https = require('https');
const fs = require('fs');
const url = 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v220/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MbikZmdWAbKXiCgjvfPtYl.woff2';
https.get(url, res => res.pipe(fs.createWriteStream('material-symbols-outlined.woff2')));
```

After downloading, the file `material-symbols-outlined.woff2` must be placed in this folder.
The CSS at `/fonts/material-symbols.css` will then serve it from your own origin with no
third-party requests.
