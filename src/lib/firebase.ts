import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { AgentPlatformBackend, getAI, getTemplateGenerativeModel } from 'firebase/ai'

export type ChatTurn = { role: 'user' | 'model'; contents: string }

// Your web app's Firebase config. Set the values in .env.local (see .env.example).
// These identify your project; they are not secrets.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

// App Check proves requests come from this app, so nobody can reuse the config
// above to spend your Gemini quota. On localhost, reCAPTCHA can't vouch for you,
// so dev builds send the debug token you registered in the console instead.
// Production builds never include it.
if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN
}

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
})

// Agent Platform (the Vertex AI Gemini API) can read the catalogue straight from
// Cloud Storage. Its default location is `global`, where the newest models are served.
// Limited-use tokens are short-lived, which limits what a stolen one is worth.
const ai = getAI(app, { backend: new AgentPlatformBackend(), useLimitedUseAppCheckTokens: true })

// The prompt lives on the server as the `product-agent` template, so the
// instructions and the appeasement budget never reach the browser.
const model = getTemplateGenerativeModel(ai)

export async function askSupportAgent(
  query: string,
  productId?: string,
  history: ChatTurn[] = [],
): Promise<string> {
  const result = await model.generateContent({
    templateId: 'product-agent',
    templateVariables: { query, productId, history },
  })
  return result.response.text()
}
