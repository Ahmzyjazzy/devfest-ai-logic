export type ChatTurn = { role: 'user' | 'model'; contents: string }

// TODO(codelab step 2): connect Firebase AI Logic and App Check.
// The finished version is on the `main` branch. Until then, the assistant
// answers every message with this note.
export async function askSupportAgent(
  query: string,
  _productId?: string,
  _history: ChatTurn[] = [],
): Promise<string> {
  return `I'm not connected yet, so I can't answer "${query}". Follow the codelab to connect me to Firebase AI Logic.`
}
