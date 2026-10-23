# Captain Store — Business Settings & Website Update Instructions

## Confirmed settings
- Store name: Captain Store
- Category: Fashion
- Theme: Black and gold
- Business phone: `0115261263`
- Business email: `captainstore.me@gmail.com`
- Delivery coverage: Nationwide, subject to courier availability
- Delivery pricing: Location-dependent
- Reference starting delivery fee: KSh 300 (not a guaranteed fee for every location)
- Return request period: 7 days
- Return conditions: Unused items in original condition; faulty or incorrect items handled separately, subject to applicable consumer rights

## Changes applied to the storefront
- Added a Delivery & Returns section.
- Added the business phone and email with clickable phone/email links.
- Updated the footer contact links and policy note.
- Added responsive styling for the policy cards.

## Before launch
1. Define actual delivery fees for each location/zone with your courier. Do not charge a flat KSh 300 nationwide unless that is confirmed to be your real policy.
2. Publish final return terms, including how customers request a return, who pays return shipping, and how refunds/exchanges are handled. Keep the policy consistent with Kenyan consumer law.
3. Replace sample product photos, names and prices with real inventory.
4. Connect the checkout to a server-side backend and database so orders are stored securely.
5. Connect M-Pesa using Safaricom Daraja API. Keep API keys/passkeys only in server environment variables; never in browser JavaScript or public GitHub.
6. Test all checkout and payment flows in Daraja sandbox before applying for production access.

## Suggested environment configuration
Create a private `.env` file for local development (do not commit it to GitHub):

```dotenv
NODE_ENV=production
STORE_NAME=Captain Store
STORE_PHONE=0115261263
STORE_EMAIL=captainstore.me@gmail.com
DELIVERY_RATES_JSON={}
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=https://YOUR-RENDER-SERVICE.onrender.com/api/payments/mpesa/callback
DATABASE_URL=
```

`DELIVERY_RATES_JSON={}` is intentionally empty. Add only real, confirmed rates, for example format `{"ConfirmedTown":300,"AnotherConfirmedTown":450}`; these are format examples, not actual Captain Store prices. The checkout should ask for/validate a location and show the confirmed fee before payment.

## Render deployment overview
1. Push the website and backend source to a private or public GitHub repository (never include `.env`).
2. Create a Node.js Web Service on Render and a PostgreSQL database.
3. Set the build command to `npm install` and the start command to `npm start` if your backend uses Node.js/Express.
4. Add the database connection string and Daraja credentials in Render's Environment settings.
5. Set the callback URL to your real deployed Render domain plus `/api/payments/mpesa/callback`.
6. Test `/api/health`, product retrieval, order creation, and Daraja sandbox callbacks.
7. Complete Safaricom's production approval before accepting real payments.

**Important:** The current storefront's checkout is still a demo UI. Updating contact/policy content does not itself create a working backend, database, live M-Pesa payments, or order management. Those require backend implementation and end-to-end testing.
