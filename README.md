# Qorelly Store AI: a Firebase AI Logic codelab

**Build an AI-powered customer support agent using Firebase AI Logic.** This is the
companion repo for the DevFest Ilorin 2026 workshop.

Qorelly Store is a small demo shop in Ilorin. Its "Ask us" assistant answers
questions about products, delivery and returns. It runs on a **server prompt
template**, so the instructions and the confidential goodwill budget never reach
the browser.

![Qorelly Store with the support chat open](docs/screenshots/store.jpg)

> Nothing here is for sale. The products, prices and policies are sample data in
> `src/data/catalogue.json`.

---

## How it works

```
Browser ──App Check──▶ Firebase AI Logic ──▶ Gemini on Agent Platform
                        (product-agent template)        │
                                                        ▼
                                  catalogue.txt in Cloud Storage
                                  (read by the AI Logic service agent)
```

| Piece | Where |
|---|---|
| The one file the codelab edits | [`src/lib/firebase.ts`](src/lib/firebase.ts) |
| Config (never committed) | `.env.local`, from [`.env.example`](.env.example) |
| Prompt template, input schema, catalogue | [`firebase/`](firebase) |
| Store data | [`src/data/catalogue.json`](src/data/catalogue.json) |

---

## The codelab in two steps

| Step | Branch | You will |
|---|---|---|
| 1 | `step-1-starter` | Run the store and set up Firebase. The chat isn't connected yet |
| 2 | `main` | Connect the chat to Firebase AI Logic and secure it with App Check |

---

## Quick start

Requires Node 20 or later.

```bash
git clone <this repo> devfest-ai-logic
cd devfest-ai-logic
npm install
cp .env.example .env.local   # fill this in during the codelab
npm run dev                  # http://localhost:5173
```

The store loads without any config. Until `.env.local` is filled in, the chat
replies with what to set up.

---

## Firebase setup checklist

1. Create a Firebase project (for example `qorelly-store-ai`) and upgrade it to
   **Blaze**.
2. Register a web app and copy its config into `.env.local`.
3. **AI Logic → Get started → Agent Platform Gemini API.** Don't choose the Gemini
   Developer API, because it can't read files from Cloud Storage.
4. **Storage → Get started.** Use production mode and keep the rules as they are.
   Upload [`firebase/catalogue.txt`](firebase/catalogue.txt).
5. In Cloud console, open your bucket, go to **Permissions → Grant access**, and grant
   `service-<PROJECT_NUMBER>@gcp-sa-firebasevertexai.iam.gserviceaccount.com`
   the **Storage Object Viewer** role.
6. **AI Logic → Prompt templates → Create.** Use the ID `product-agent` and the model
   `gemini-3.1-flash-lite`. Paste in [`product-agent.prompt`](firebase/product-agent.prompt)
   (replace `YOUR_PROJECT_ID`) and [`product-agent.schema.json`](firebase/product-agent.schema.json).
   Test it, then save.
7. **App Check:**
   - Create a reCAPTCHA key in Cloud console (Security → Fraud Defense).
   - Register the key under App Check → Apps.
   - Generate a debug token and add it to `.env.local`.
8. `npm run dev` and ask the assistant something.

---

## Troubleshooting

| You see | Cause | Fix |
|---|---|---|
| `AI/no-api-key` or "I'm not set up yet" | `.env.local` missing or not loaded | Fill it in and restart `npm run dev` |
| `exchangeDebugToken` 403 | Debug token not registered, or registered on another app | App Check → Apps → ⋮ → Manage debug tokens |
| 401 "App Check token is invalid" | Same as above | Same as above, then wait a minute (throttling) |
| `AI/api-not-enabled` | AI Logic not set up for this project | AI Logic → Get started → Agent Platform |
| 400 "Referencing Google Cloud Storage files directly is not supported" | Using the Gemini Developer API (`GoogleAIBackend`) | Use `AgentPlatformBackend` |
| 404 "Publisher model … was not found" | Model not served in the chosen location | Leave `AgentPlatformBackend()` on its default, `global` |
| 403 `storage.objects.get` | The AI Logic service agent can't read the bucket | Checklist step 5. Allow 1–2 minutes for the grant to take effect |

---

## Changing the products

Edit `src/data/catalogue.json`, then:

```bash
npm run catalogue   # rewrites firebase/catalogue.txt
```

Upload the new `catalogue.txt` to Storage, replacing the old one, so the
assistant knows what the store shows.

---

## Clean up

Delete the App Check debug token, then delete the Firebase project, or downgrade
it to Spark.
