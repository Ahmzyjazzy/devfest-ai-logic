export type ChatTurn = { role: 'user' | 'model'; contents: string }

// TODO(codelab): connect Firebase AI Logic.
// Until then, the assistant answers every message with this note.
export async function askSupportAgent(
  query: string,
  _productId?: string,
  _history: ChatTurn[] = [],
): Promise<string> {
  return `I'm not connected yet, so I can't answer "${query}". Follow the codelab to connect me to Firebase AI Logic.`
}
