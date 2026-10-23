# Captain Store — Fashion storefront

A responsive front-end fashion store for Kenya, built with HTML, CSS, and vanilla JavaScript.

## Run locally
1. Extract `captain-store.zip`.
2. Open `index.html` in a browser, or use VS Code's Live Server extension.
3. Product listings, category filters, search, sorting, cart quantity controls, local cart persistence, and demo checkout work in the browser.

## Before launching publicly
- Replace sample products, prices, and image URLs in `script.js` with your actual inventory.
- Update contact details and delivery/returns policies in `index.html`.
- Replace the example contact email `hello@captainstore.example`.
- Add a real backend to store orders securely; this demo checkout does not submit orders anywhere.
- Integrate M-Pesa through a trusted payment provider and a server-side API. Never put payment secrets, consumer keys, or API credentials in front-end JavaScript.
- Configure HTTPS, privacy/terms pages, and real newsletter signup before collecting customer information.

## Files
- `index.html` — page structure
- `styles.css` — responsive black-and-gold design
- `script.js` — sample catalog, search/filter/sort, cart, and demo checkout

Product imagery currently uses externally hosted Unsplash image URLs, and fonts load from Google Fonts, so those elements require an internet connection.
