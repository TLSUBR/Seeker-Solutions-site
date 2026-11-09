# Seeker Solutions site update v5: setup steps

About 40 minutes in total. Each step works on its own, so you can stop partway. This replaces all earlier updates (v1–v4). It adds your new logo, favicons and social-share image.

## 1. Upload the files to GitHub (5 min on a laptop)

Easiest, on your laptop:
1. Unzip seeker-site-update-v5.zip.
2. Open github.com/TLSUBR/seeker-solutions-site → Add file → Upload files.
3. Select everything inside the unzipped folder (the files AND the `api` and `assets` folders) and drag it onto the page. GitHub keeps the folders.
4. Commit. Vercel redeploys automatically.

**Optional cleanup (delete):** `thank-you.html` (broken and never deployed), `speed-insights.js` (unused), `stitch_ai_automation_website v2.zip`, `screen.png`.

Why `package.json` matters: the old build copied only index.html, so no other file (llms.txt, the logo, the favicons) could ever go live.

## 2. Fix store.seekersolutions.org (5 min, free)

1. Cloudflare → seekersolutions.org → DNS → Records. Delete any existing `store` or `shop` record.
2. Add record: Type **CNAME**, Name **store**, Target **domains.gumroad.com**, Proxy status **DNS only (gray cloud)**. Save.
3. Gumroad → Settings → Advanced → Custom domain → enter `store.seekersolutions.org` → Verify. It can take up to 24 hours.

## 3. Brevo: lists, labels and key (10 min)

1. **Lists:** Brevo → Contacts → Lists → create **Subscribers**, **Buyers**, **Sponsored seat requests** and **Inquiries**. Note each list's ID number.
2. **Labels:** Contacts → Settings → Contact attributes → Add attribute, type **Text**, for each of: `SOURCE`, `INTEREST`, `ASSESSMENT`, `PRODUCT`. (If you skip this, signups still save, just without labels.)
3. **API key:** your name (top right) → SMTP & API → API Keys → Generate. Copy it.
4. **Automations:** Automations → create a workflow starting at "Contact added to list: Subscribers" for welcome emails, and one for "Buyers" for the post-purchase sequence. Inquiries get no automation; that list is just a record.

## 4. Vercel settings (5 min)

Vercel → seeker-solutions-site → Settings → Environment Variables. Add each, for Production:

| Name | Value |
|---|---|
| BREVO_API_KEY | the key from step 3 |
| BREVO_LIST_ID | Subscribers list ID |
| BREVO_BUYERS_LIST_ID | Buyers list ID |
| BREVO_SPONSOR_LIST_ID | Sponsored seat requests list ID |
| BREVO_INQUIRY_LIST_ID | Inquiries list ID |
| GUMROAD_PING_TOKEN | any long random word you make up |

Then Deployments → latest → Redeploy (env changes only apply after a redeploy).
Also: Analytics tab → **Enable** Web Analytics (free on the Hobby plan).

## 5. Connect Gumroad sales to Brevo (2 min)

Gumroad → Settings → Advanced → **Ping** → paste
`https://seekersolutions.org/api/gumroad-ping?token=YOUR_TOKEN` (same word as GUMROAD_PING_TOKEN) → "Send test ping". The test email should appear in your Brevo Buyers list. Gift purchases add the recipient, so recipients get your buyer emails too.

## 6. Buttons (already done)

The workbook and Sponsor a Seeker buttons already point to your Gumroad products. They work as soon as those products are published on Gumroad. Only one line needs hand updates:

- `var SEATS_SPONSORED = 0, SEATS_GIVEN = 0;` → update these by hand. The count shows on the site once sponsored is above 0.

## 7. Giving out sponsored seats (5 min per batch)

1. Gumroad → Checkout → Discounts → create several codes at **100% off** the workbook, each limited to **1 use**.
2. When a "Sponsor a Seeker" sale comes in, email the next person on the Sponsored seat requests list (oldest first) one code, then update the seat numbers in index.html.
3. Aim to give every seat within a week. Requests also arrive in your email through the site form, with any note the person left.

## Channel links

Use `seekersolutions.org/?utm_source=youtube`, `?utm_source=x`, `?utm_source=reddit` and so on wherever you post. The site remembers the first source on each visitor's browser and saves it as SOURCE in Brevo, and includes it in form emails as `came_from`.

## Check it worked

- seekersolutions.org/llms.txt shows plain text (not the homepage).
- Visit `seekersolutions.org/?utm_source=test`, join the list → the email appears in Brevo Subscribers with SOURCE = test.
- Request a sponsored copy → it appears in Sponsored seat requests, and you get an email.
- Gumroad test ping → the email appears in Brevo Buyers.
- If something fails: Vercel → Logs shows lines starting `subscribe failed` or `gumroad-ping` with the reason.
