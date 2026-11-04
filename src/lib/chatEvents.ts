// Lets any page open the chat with a question already typed in.
const ASK_EVENT = 'qorelly:ask'

export function askInChat(question: string) {
  window.dispatchEvent(new CustomEvent<string>(ASK_EVENT, { detail: question }))
}

export function onAskInChat(handler: (question: string) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail)
  window.addEventListener(ASK_EVENT, listener)
  return () => window.removeEventListener(ASK_EVENT, listener)
}
