# Arshola Janata Party (আরশোলা জনতা পার্টি)

A Bengal-based citizens' platform landing page, built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

Four pillars: **Freedom of Speech · A Clean City · Right to Vote · Anti-Alienization** (equal citizenship, regardless of language, religion, surname or paperwork).

*Arshola* (আরশোলা) is Bangla for cockroach — a slur once used against ordinary people, reclaimed here as a reminder: citizens are not disposable.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then fill in your Google Form IDs
npm run dev
```

Open <http://localhost:3000>.

## Build for production

```bash
npm run build
npm start
```

## Connecting the membership form to a Google Form

The `/api/join` route forwards each submission (name + phone) to a Google Form, which writes them into the linked Google Sheet automatically.

**One-time setup:**

1. Go to <https://forms.google.com> and create a new form titled e.g. "AJP Membership".
2. Add **two** *short-answer* questions:
   - **Name** (required)
   - **Mobile number** (required)
3. Click the **Responses** tab → green Sheets icon → "Create new spreadsheet". This is where all sign-ups will be stored.
4. Click **Send** → copy the form's live URL. It looks like:
   `https://docs.google.com/forms/d/e/`**`<FORM_ID>`**`/viewform`
   The portion between `/e/` and `/viewform` is your `GOOGLE_FORM_ID`.
5. Open that live URL in a new tab. **Right-click → View page source.** Search for `entry.` — you will find two numeric ids like `entry.1234567890`. The order matches the field order. Match each to its field.
6. Put all three values into `.env.local`:

   ```
   GOOGLE_FORM_ID=<the id from step 4>
   GOOGLE_FORM_ENTRY_NAME=entry.<id of the Name field>
   GOOGLE_FORM_ENTRY_PHONE=entry.<id of the Mobile field>
   ```

7. Restart `npm run dev`. Submit the form on the site once, then check the linked Google Sheet — your row should appear.

If the env vars are missing, the API still accepts submissions and just logs them server-side, so the site stays usable while you're getting the Google Form set up.

## Project layout

```
app/
  layout.tsx         Root layout, fonts (Playfair, Inter, Hind Siliguri)
  page.tsx           Hero, about, four pillars, membership, footer
  globals.css        Tailwind + Bengal-themed components
  api/join/route.ts  Validates and forwards submissions to Google Forms
components/
  JoinForm.tsx       Name + phone, posts to /api/join
tailwind.config.ts   Palette: bone, alta, sindoor, terracotta, gold, ink, moss
.env.local.example   Template for Google Form credentials
```

## Customising

- **Party name / tagline:** [app/layout.tsx](app/layout.tsx) metadata and [app/page.tsx](app/page.tsx) hero.
- **Pillars:** edit the `pillars` array at the top of [app/page.tsx](app/page.tsx).
- **Colours:** [tailwind.config.ts](tailwind.config.ts) → `theme.extend.colors`.
