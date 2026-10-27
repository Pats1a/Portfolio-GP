# portfolio

My personal site. Plain HTML, CSS and a little JavaScript, no frameworks and no build step.

## running it locally

Just open `index.html`, or if you want a local server:

```
npx http-server -p 5173
```

## files

- `index.html` - all the content (English)
- `style.css` - the styling
- `js/i18n.js` - the EN / GE switch and all the Georgian text
- `js/dots.js` - the dot grid in the hero that reacts to the mouse
- `js/main.js` - theme switch, animations, scroll effects, cursor, contact form
- `404.html` - shown for addresses that don't exist (self-contained on purpose)
- `favicon.svg`, `apple-touch-icon.png` - browser tab and phone home screen icons
- `og-image.png` - the preview picture when the link is shared (1200x630)
- `robots.txt` - lets search engines in

## putting it online

Any static host works, there's nothing to build. The easiest ones:

- **Netlify Drop** - go to app.netlify.com/drop and drag this whole folder onto the page. Done in a minute.
- **Vercel** - push the folder to GitHub, import the repo on vercel.com, leave every setting as it is.
- **GitHub Pages** - push to GitHub, Settings > Pages > deploy from the main branch.
  The 404 page uses addresses starting with `/`, so on GitHub Pages it only looks right with a custom domain
  (or a `username.github.io` repo), not on `username.github.io/repo-name/`.

All three compress the files automatically, so there's no need to minify anything.

### once it has an address

- In `index.html`, change `og-image.png` in the `og:image` and `twitter:image` tags to the full address,
  e.g. `https://giorgipatsia.dev/og-image.png`. LinkedIn and Facebook need the full address to show the picture.
- Paste the link into https://www.opengraph.xyz to check how the preview looks.

## todo

- [ ] add real projects next to "This website" as they come in (copy the first card, text goes in `index.html` and `js/i18n.js`)
- [ ] add the first job to "My path" when it happens
- [ ] maybe a real form service (Formspree or similar) so messages arrive without opening an email app

"Years of coding" in the about section counts itself from 2022, no need to update it.
