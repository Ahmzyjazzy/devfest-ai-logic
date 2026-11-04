import { ChatRoundDotsIcon as ChatBold, CloseCircleIcon } from '@solar-icons/react/bold'
import { ArrowUpIcon, ChatRoundDotsIcon as ChatOutline } from '@solar-icons/react/outline'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import Markdown from 'react-markdown'
import { onAskInChat } from '../lib/chatEvents'
import { askSupportAgent, type ChatTurn } from '../lib/firebase'
import { useProductId } from '../lib/route'
import { Link } from './Link'

const STORAGE_KEY = 'qorelly-store-chat'

const suggestions = [
  'Which gift is good for my mum?',
  'How much is delivery to Lagos?',
  'My first-aid kit arrived damaged',
]

function loadTurns(): ChatTurn[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function ChatWidget() {
  const productId = useProductId()
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<ChatTurn[]>(loadTurns)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns))
    } catch {
      // Private windows can block storage. The chat still works without it.
    }
  }, [turns])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [turns, sending, open])

  useEffect(
    () =>
      onAskInChat((question) => {
        setOpen(true)
        setDraft(question)
        setTimeout(() => inputRef.current?.focus())
      }),
    [],
  )

  async function send(text: string) {
    const query = text.trim()
    if (!query || sending) return

    const history = turns
    setTurns([...history, { role: 'user', contents: query }])
    setDraft('')
    setSending(true)

    try {
      const reply = await askSupportAgent(query, productId ?? undefined, history)
      setTurns((current) => [...current, { role: 'model', contents: reply }])
    } catch (error) {
      console.error('Support agent request failed:', error)
      setTurns((current) => [
        ...current,
        { role: 'model', contents: "Couldn't reach the assistant. Check your connection and try again." },
      ])
    } finally {
      setSending(false)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    void send(draft)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Chat with Qorelly Store"
          className="flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white sm:w-96"
        >
          <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-ink">Ask Qorelly Store</h2>
              <p className="text-xs text-neutral-500">Products, delivery and returns</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-neutral-400 hover:text-ink"
            >
              <CloseCircleIcon className="size-6" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {turns.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-neutral-600">Hello. What can we help you with today?</p>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="block rounded-full border border-neutral-200 px-4 py-2 text-left text-sm text-ink hover:border-brand-tint hover:bg-brand-pale"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {turns.map((turn, index) =>
              turn.role === 'user' ? (
                <p key={index} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white">
                  {turn.contents}
                </p>
              ) : (
                <div key={index} className="chat-markdown w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-2.5 text-sm text-ink">
                  <Markdown
                    components={{
                      a: ({ href = '', children }) =>
                        href.startsWith('/') ? (
                          <Link href={href}>{children}</Link>
                        ) : (
                          <a href={href} target="_blank" rel="noreferrer">
                            {children}
                          </a>
                        ),
                    }}
                  >
                    {turn.contents}
                  </Markdown>
                </div>
              ),
            )}

            {sending && <p className="w-fit rounded-2xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500">Typing…</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-neutral-200 p-3">
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your question"
              className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              aria-label="Send message"
              className="rounded-full bg-brand p-2.5 text-white hover:bg-brand-hover disabled:bg-neutral-300"
            >
              <ArrowUpIcon className="size-5" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 font-medium text-white hover:bg-brand-hover"
      >
        {open ? <ChatBold className="size-5" /> : <ChatOutline className="size-5" />}
        Ask us
      </button>
    </div>
  )
}
