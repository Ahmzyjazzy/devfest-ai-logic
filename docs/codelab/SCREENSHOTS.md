# Codelab walkthrough screenshots

Captured on 4 November 2026 from a brand-new Firebase project (`devfest-store-ai`) in a 1280×800 desktop layout, in the order an attendee does each step. Project lists, emails, API keys, the reCAPTCHA key and the debug token are masked.

## Troubleshooting

**00.** Troubleshooting: project limit reached

![Troubleshooting: project limit reached](screenshots/00-project-limit.jpg)

## 1. Create the Firebase project

**01.** Firebase console: Create a new Firebase project (project list masked)

![Firebase console: Create a new Firebase project (project list masked)](screenshots/01-console-home.png)

**02.** Name the project devfest-store-ai; the project ID appears below it

![Name the project devfest-store-ai; the project ID appears below it](screenshots/02-project-name.png)

**03.** Optional: Gemini in Firebase (leave the default, click Continue)

![Optional: Gemini in Firebase (leave the default, click Continue)](screenshots/03-gemini-in-firebase.png)

**04.** Turn Google Analytics off (not needed), then Create project

![Turn Google Analytics off (not needed), then Create project](screenshots/04-analytics-off.png)

**05.** Your Firebase project is ready (about 25 seconds)

![Your Firebase project is ready (about 25 seconds)](screenshots/05-project-ready.png)

**06.** Project overview on the Spark plan; Upgrade is bottom-left

![Project overview on the Spark plan; Upgrade is bottom-left](screenshots/06-project-overview.png)

## 2. Upgrade to Blaze

**07.** Pricing plans: Select plan under Blaze (pay as you go)

![Pricing plans: Select plan under Blaze (pay as you go)](screenshots/07-pricing-plans.png)

**08.** Pick your existing Cloud Billing account. No billing account yet? Click Create a Cloud Billing account (or redeem the event credits first)

![Pick your existing Cloud Billing account. No billing account yet? Click Create a Cloud Billing account (or redeem the event credits first)](screenshots/08-billing-account.png)

**09.** Set a billing budget: $5 is plenty for this codelab; you get an email as spend approaches it (it is an alert, not a cap)

![Set a billing budget: $5 is plenty for this codelab; you get an email as spend approaches it (it is an alert, not a cap)](screenshots/09-billing-budget.png)

**10.** Review and click Link Cloud Billing account

![Review and click Link Cloud Billing account](screenshots/10-link-billing.png)

**11.** Plan change completed: the project is on Blaze

![Plan change completed: the project is on Blaze](screenshots/11-blaze-done.png)

## 3. Register the web app

**12.** Add app: choose the Web platform (the </> icon)

![Add app: choose the Web platform (the </> icon)](screenshots/12-add-app.png)

**13.** Nickname: DevFest Store Web. Leave Hosting unticked. Register app

![Nickname: DevFest Store Web. Leave Hosting unticked. Register app](screenshots/13-register-web-app.png)

**14.** Copy these firebaseConfig values into .env.local (values masked here). Skip npm install: the repo already has firebase

![Copy these firebaseConfig values into .env.local (values masked here). Skip npm install: the repo already has firebase](screenshots/14-web-config.png)

## 4. Turn on Firebase AI Logic

**15.** AI services > AI Logic > Get started

![AI services > AI Logic > Get started](screenshots/15-ai-logic-start.png)

**16.** Choose Agent Platform Gemini API (right card), NOT the Gemini Developer API: only Agent Platform can read the catalogue from Cloud Storage

![Choose Agent Platform Gemini API (right card), NOT the Gemini Developer API: only Agent Platform can read the catalogue from Cloud Storage](screenshots/16-choose-provider.png)

**17.** Enable APIs: this also turns on App Check enforcement for AI Logic, which is why step 9 (debug token) matters

![Enable APIs: this also turns on App Check enforcement for AI Logic, which is why step 9 (debug token) matters](screenshots/17-enable-apis.png)

**18.** APIs enabled. AI monitoring is optional: leave it on and click Continue

![APIs enabled. AI monitoring is optional: leave it on and click Continue](screenshots/18-ai-monitoring.png)

**19.** Finish setup: the console itself says you need the App Check debug provider for local development

![Finish setup: the console itself says you need the App Check debug provider for local development](screenshots/19-finish-setup.png)

**20.** AI Logic is on. App Check shows Unregistered until step 9

![AI Logic is on. App Check shows Unregistered until step 9](screenshots/20-ai-logic-apps.png)

## 5. Cloud Storage, rules and the catalogue

**21.** Databases & Storage > Storage > Get started

![Databases & Storage > Storage > Get started](screenshots/21-storage-start.png)

**22.** Keep the No cost location default (a US region) and Continue

![Keep the No cost location default (a US region) and Continue](screenshots/22-bucket-location.png)

**23.** Start in production mode (deny all). We open only catalogue.txt next. Create

![Start in production mode (deny all). We open only catalogue.txt next. Create](screenshots/23-production-mode.png)

**24.** The empty bucket: click Upload file

![The empty bucket: click Upload file](screenshots/24-bucket-empty.png)

**25.** Upload firebase/catalogue.txt from the repo (or npm run catalogue:upload)

![Upload firebase/catalogue.txt from the repo (or npm run catalogue:upload)](screenshots/25-catalogue-uploaded.png)

**26.** Rules tab: paste firebase/storage.rules (only catalogue.txt is readable) and click Publish

![Rules tab: paste firebase/storage.rules (only catalogue.txt is readable) and click Publish](screenshots/26-storage-rules.png)

## 6. Let AI Logic read the catalogue (IAM)

**27.** Project settings > General: copy the Project number. It goes into the AI Logic service agent's email

![Project settings > General: copy the Project number. It goes into the AI Logic service agent's email](screenshots/27-project-number.png)

**27b.** Where to copy the principal: IAM & Admin > IAM, tick Include Google-provided role grants, find Firebase AI Logic Service Agent (service-<PROJECT_NUMBER>@gcp-sa-firebasevertexai...)

![Where to copy the principal: IAM & Admin > IAM, tick Include Google-provided role grants, find Firebase AI Logic Service Agent (service-<PROJECT_NUMBER>@gcp-sa-firebasevertexai...)](screenshots/27b-find-service-agent.png)

**28.** Google Cloud console > Cloud Storage > your bucket > Permissions > Grant access

![Google Cloud console > Cloud Storage > your bucket > Permissions > Grant access](screenshots/28-bucket-permissions.png)

**29.** New principal: service-<PROJECT_NUMBER>@gcp-sa-firebasevertexai.iam.gserviceaccount.com. Role: Storage Object Viewer. Save

![New principal: service-<PROJECT_NUMBER>@gcp-sa-firebasevertexai.iam.gserviceaccount.com. Role: Storage Object Viewer. Save](screenshots/29-grant-viewer.png)

**30.** Policy updated. Allow 1-2 minutes before testing

![Policy updated. Allow 1-2 minutes before testing](screenshots/30-policy-updated.png)

## 7. The server prompt template

**31.** AI Logic > Prompt templates > Create template > Blank Template

![AI Logic > Prompt templates > Create template > Blank Template](screenshots/31-create-template.png)

**32.** Name: Product Agent. ID: product-agent (exact). Configuration: paste the frontmatter (model + input schema) from firebase/product-agent.prompt

![Name: Product Agent. ID: product-agent (exact). Configuration: paste the frontmatter (model + input schema) from firebase/product-agent.prompt](screenshots/32-template-config.png)

**33.** Prompt: paste the rest of product-agent.prompt and replace YOUR_PROJECT_ID with your project ID

![Prompt: paste the rest of product-agent.prompt and replace YOUR_PROJECT_ID with your project ID](screenshots/33-template-prompt.png)

**34.** Test input: paste firebase/product-agent.test-input.json, then Save template (the test buttons unlock after saving)

![Test input: paste firebase/product-agent.test-input.json, then Save template (the test buttons unlock after saving)](screenshots/34-template-test-input.png)

**35.** Run prompt test: a real answer from catalogue.txt proves the rules, the IAM grant and the template before writing any code

![Run prompt test: a real answer from catalogue.txt proves the rules, the IAM grant and the template before writing any code](screenshots/35-template-test-response.png)

## 8. App Check: Fraud Defense key

**36.** Google Cloud console > Security > Fraud Defense. On a new project, Enable the reCAPTCHA Enterprise API first

![Google Cloud console > Security > Fraud Defense. On a new project, Enable the reCAPTCHA Enterprise API first](screenshots/36-enable-recaptcha-api.png)

**37.** Fraud Defense dashboard: Create key

![Fraud Defense dashboard: Create key](screenshots/37-fraud-defense.png)

**38.** Display name: DevFest Store Web. Type: Web. Domains: localhost and 127.0.0.1 (workshop only; remove both and add your real domain before production). Create key

![Display name: DevFest Store Web. Type: Web. Domains: localhost and 127.0.0.1 (workshop only; remove both and add your real domain before production). Create key](screenshots/38-create-key.png)

**39.** Copy the key ID (next to the name; masked here) into VITE_RECAPTCHA_SITE_KEY. Ignore the website integration steps: the Firebase SDK handles them

![Copy the key ID (next to the name; masked here) into VITE_RECAPTCHA_SITE_KEY. Ignore the website integration steps: the Firebase SDK handles them](screenshots/39-key-created.png)

## 9. App Check: register the app and add a debug token

**40.** Firebase console > Security > App Check > Apps: Register DevFest Store Web

![Firebase console > Security > App Check > Apps: Register DevFest Store Web](screenshots/40-appcheck-apps.png)

**41.** Choose Fraud Defense (formerly reCAPTCHA Enterprise), not plain reCAPTCHA

![Choose Fraud Defense (formerly reCAPTCHA Enterprise), not plain reCAPTCHA](screenshots/41-choose-fraud-defense.png)

**42.** Paste the key ID from Fraud Defense (masked here), keep TTL at 1 hour, Save

![Paste the key ID from Fraud Defense (masked here), keep TTL at 1 hour, Save](screenshots/42-paste-site-key.png)

**43.** Registered with Fraud Defense

![Registered with Fraud Defense](screenshots/43-appcheck-registered.png)

**44.** For localhost: open the menu next to the app > Manage debug tokens

![For localhost: open the menu next to the app > Manage debug tokens](screenshots/44-manage-debug-tokens.png)

**45.** Add debug token: give it a name, then Generate token

![Add debug token: give it a name, then Generate token](screenshots/45-add-debug-token.jpg)

**46.** Copy the value NOW into VITE_APPCHECK_DEBUG_TOKEN in .env.local: it is never shown again. Treat it like a password. Then Save

![Copy the value NOW into VITE_APPCHECK_DEBUG_TOKEN in .env.local: it is never shown again. Treat it like a password. Then Save](screenshots/46-copy-debug-token.png)

**47.** Debug token added. Your laptop can now pass App Check on localhost

![Debug token added. Your laptop can now pass App Check on localhost](screenshots/47-debug-token-added.png)

**48.** App Check > APIs: Firebase AI Logic is Enforced (turned on automatically by the AI Logic setup)

![App Check > APIs: Firebase AI Logic is Enforced (turned on automatically by the AI Logic setup)](screenshots/48-appcheck-enforced.png)

## 10. Run it

**49.** npm run dev: the DevFest Salesperson answers from your catalogue, through App Check and your server template

![npm run dev: the DevFest Salesperson answers from your catalogue, through App Check and your server template](screenshots/49-store-live.png)

## 11. Clean up

**50.** Project settings > General, bottom of the page: Delete project. Delete the App Check debug token and remove localhost and 127.0.0.1 from the Fraud Defense key first. A deleted project keeps counting against your project quota for 30 days.

![Delete project at the bottom of Project settings > General](screenshots/50-delete-project.png)
