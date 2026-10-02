import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'

type Kind = 'kw' | 'str' | 'fn' | 'type' | 'num' | 'punc' | 'tag' | 'prop' | 'com' | 'plain'

const COLORS: Record<Kind, string> = {
  kw: 'text-[#c4a7ff]',
  str: 'text-[#d4f77a]',
  fn: 'text-[#67e8f9]',
  type: 'text-[#fcd34d]',
  num: 'text-[#fdba74]',
  punc: 'text-white/45',
  tag: 'text-[#f9a8d4]',
  prop: 'text-[#93c5fd]',
  com: 'text-white/30 italic',
  plain: 'text-white/85',
}

// Order matters: first match wins.
const RULES: [RegExp, Kind][] = [
  [/^\/\/.*/, 'com'],
  [/^(['"`])(?:\\.|(?!\1).)*\1/, 'str'],
  [/^<\/?[A-Z][\w.]*|^\/?>/, 'tag'],
  [/^(?:const|let|return|export|default|function|async|await|if|else|import|from|new)\b/, 'kw'],
  [/^\d+/, 'num'],
  [/^[A-Za-z_$][\w$]*(?=\s*:)/, 'prop'],
  [/^[a-z][\w]*(?==\{)/, 'prop'],
  [/^[A-Za-z_$][\w$]*(?=\s*\()/, 'fn'],
  [/^[A-Z][\w$]*/, 'type'],
  [/^[A-Za-z_$][\w$]*/, 'plain'],
  [/^\s+/, 'plain'],
  [/^(?:\.{3}|=>|[{}()[\];,.=:+\-*/!?&|<>])/, 'punc'],
]

interface Token {
  text: string
  kind: Kind
}

const tokenize = (line: string): Token[] => {
  const out: Token[] = []
  let rest = line
  while (rest) {
    let text = rest[0]
    let kind: Kind = 'plain'
    for (const [re, k] of RULES) {
      const m = re.exec(rest)
      if (m?.[0]) {
        text = m[0]
        kind = k
        break
      }
    }
    const prev = out[out.length - 1]
    if (prev && prev.kind === kind) prev.text += text
    else out.push({ text, kind })
    rest = rest.slice(text.length)
  }
  return out
}

interface Snippet {
  file: string
  lang: string
  code: string
  command: string
  running: string
  output: string[]
  badge: string
  /** Word that triggers an autocomplete popup while it is being typed. */
  suggest?: { word: string; items: string[] }
}

const SNIPPETS: Snippet[] = [
  {
    file: 'Dashboard.tsx',
    lang: 'TypeScript JSX',
    code: `export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => api.get('/expenses'),
  })

  if (isLoading) return <Skeleton />
  return <Chart data={data} animate />
}`,
    command: 'npm run build',
    running: 'Compiling client & server bundles…',
    output: ['✓ Compiled successfully in 1.8s', '✓ Lighthouse  98 perf · 100 a11y'],
    badge: 'build passed · 98 perf',
    suggest: { word: 'useQuery', items: ['useQuery', 'useQueryClient', 'useQueries'] },
  },
  {
    file: 'receipts.route.ts',
    lang: 'TypeScript',
    code: `router.post('/scan', auth, async (req, res) => {
  const text = await ocr(req.file)
  const tx = await ai.extract(text)

  // save to the user's ledger
  await Transaction.create(tx)
  res.status(201).json(tx)
})`,
    command: 'curl -X POST /api/scan',
    running: 'Waiting for response…',
    output: ['HTTP/1.1 201 Created  · 182ms', '{ "amount": 2450, "category": "Food" }'],
    badge: '201 Created · 182ms',
    suggest: { word: 'extract', items: ['extract', 'extractItems', 'explain'] },
  },
]

const prepare = (s: Snippet) => {
  const rawLines = s.code.split('\n')
  const lineStart: number[] = []
  let offset = 0
  rawLines.forEach((l) => {
    lineStart.push(offset)
    offset += l.length + 1
  })
  const suggestAt = s.suggest ? s.code.indexOf(s.suggest.word) : -1
  return {
    ...s,
    lines: rawLines.map(tokenize),
    lineLen: rawLines.map((l) => l.length),
    lineStart,
    total: s.code.length,
    suggestAt,
  }
}

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const LINE_H = 17
const MAX_LINES = Math.max(...SNIPPETS.map((s) => s.code.split('\n').length))

/** Human-ish typing rhythm: quick runs, slower after brackets and line breaks, the odd pause to think. */
const delayFor = (ch: string) => {
  const think = Math.random() < 0.025 ? 220 : 0
  if (ch === '\n') return 110 + Math.random() * 100
  if ('({['.includes(ch)) return 50 + Math.random() * 45 + think
  if (ch === ' ') return 12 + Math.random() * 20
  return 16 + Math.random() * 28 + think
}

type Phase = 'typing' | 'command' | 'running' | 'done'

const renderTokens = (tokens: Token[], visible: number) => {
  const nodes: React.ReactNode[] = []
  let left = visible
  for (let i = 0; i < tokens.length && left > 0; i++) {
    const t = tokens[i]
    const text = t.text.slice(0, left)
    left -= text.length
    nodes.push(
      <span key={i} className={COLORS[t.kind]}>
        {text}
      </span>,
    )
  }
  return nodes
}

const Caret: React.FC<{ blink: boolean; block?: boolean }> = ({ blink, block }) => (
  <span
    aria-hidden
    className={cn(
      'inline-block bg-brand align-middle',
      block ? 'ml-1 h-[11px] w-[6px]' : 'ml-px h-[13px] w-[1.5px]',
      blink && 'animate-caret',
    )}
  />
)

const CodeEditorVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion()
  const snippets = useMemo(() => SNIPPETS.map(prepare), [])

  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [cmdTyped, setCmdTyped] = useState(0)
  const [outLines, setOutLines] = useState(0)
  const [spin, setSpin] = useState(0)

  const s = snippets[index]

  // Reduced motion: show the finished state of the first file and stop.
  useEffect(() => {
    if (!reduced) return
    setTyped(snippets[0].total)
    setCmdTyped(snippets[0].command.length)
    setOutLines(snippets[0].output.length)
    setPhase('done')
  }, [reduced, snippets])

  useEffect(() => {
    if (!inView || reduced) return
    let t: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (typed >= s.total) {
        t = setTimeout(() => setPhase('command'), 500)
      } else if (s.suggest && typed === s.suggestAt + 4) {
        // Like a real dev: type a few letters, glance at IntelliSense, hit Tab to accept
        t = setTimeout(() => setTyped(s.suggestAt + s.suggest!.word.length), 750)
      } else {
        const ch = s.code[typed]
        let next = typed + 1
        // Editor auto-indent: leading whitespace appears instantly after a line break
        if (ch === '\n') while (s.code[next] === ' ') next++
        t = setTimeout(() => setTyped(next), delayFor(ch))
      }
    } else if (phase === 'command') {
      if (cmdTyped >= s.command.length) t = setTimeout(() => setPhase('running'), 280)
      else t = setTimeout(() => setCmdTyped((c) => c + 1), 26 + Math.random() * 30)
    } else if (phase === 'running') {
      t = setTimeout(() => setPhase('done'), 1200)
    } else if (outLines < s.output.length) {
      t = setTimeout(() => setOutLines((n) => n + 1), 240)
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % snippets.length)
        setTyped(0)
        setCmdTyped(0)
        setOutLines(0)
        setPhase('typing')
      }, 3400)
    }

    return () => clearTimeout(t)
  }, [inView, reduced, phase, typed, cmdTyped, outLines, s, snippets.length])

  useEffect(() => {
    if (phase !== 'running') return
    const id = setInterval(() => setSpin((n) => (n + 1) % SPINNER.length), 80)
    return () => clearInterval(id)
  }, [phase])

  let caretLine = 0
  for (let i = 0; i < s.lineStart.length; i++) if (s.lineStart[i] <= typed) caretLine = i
  const caretCol = typed - s.lineStart[caretLine]

  const suggestWord = s.suggest?.word ?? ''
  const showSuggest =
    phase === 'typing' && s.suggestAt >= 0 && typed > s.suggestAt + 1 && typed < s.suggestAt + suggestWord.length
  const typedPrefix = showSuggest ? suggestWord.slice(0, typed - s.suggestAt) : ''

  return (
    <div ref={ref} className="flex h-full w-full items-center [perspective:1400px]">
      <div className="relative w-full [transform:rotateY(-11deg)_rotateX(5deg)] transition-transform duration-700 ease-[var(--ease-premium)] group-hover/spot:[transform:rotateY(-3deg)_rotateX(1deg)]">
        <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#0c0c11] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]">
          {/* Title bar + tabs */}
          <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] pl-3.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex font-mono text-[10px]">
              {snippets.map((sn, i) => (
                <span
                  key={sn.file}
                  className={cn(
                    'flex items-center gap-1.5 border-r border-line px-3 py-2 transition-colors',
                    i === index ? 'bg-[#0c0c11] text-white/90' : 'text-white/35',
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', sn.file.endsWith('x') ? 'bg-cyan-400' : 'bg-blue-400')} />
                  {sn.file}
                  {i === index && phase === 'typing' && <span className="text-white/50">●</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="relative py-2 font-mono text-[10.5px]" style={{ height: MAX_LINES * LINE_H + 16, lineHeight: `${LINE_H}px` }}>
            {s.lines.map((tokens, li) => {
              if (li > caretLine) return null
              const visible = li < caretLine ? s.lineLen[li] : caretCol
              const active = li === caretLine && phase === 'typing'
              return (
                <div key={`${index}-${li}`} className={cn('relative flex', active && 'bg-white/[0.035]')}>
                  <span className={cn('w-8 shrink-0 pr-3 text-right select-none', active ? 'text-white/55' : 'text-white/18')}>
                    {li + 1}
                  </span>
                  <span className="whitespace-pre">
                    {renderTokens(tokens, visible)}
                    {li === caretLine && (phase === 'typing' || reduced) && <Caret blink={typed >= s.total} />}
                  </span>

                  {li === caretLine && showSuggest && s.suggest && (
                    <div
                      className="absolute top-full z-10 mt-0.5 w-max overflow-hidden rounded-md border border-white/10 bg-[#16161d] py-1 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.9)]"
                      style={{ left: `calc(2rem + ${caretCol - typedPrefix.length}ch)` }}
                    >
                      {s.suggest.items.map((item, i) => (
                        <div
                          key={item}
                          className={cn('flex items-center gap-2 px-2 py-[1px] pr-6', i === 0 && 'bg-brand/15')}
                        >
                          <span className="text-[9px] text-[#c4a7ff]">ƒ</span>
                          <span className="text-white/60">
                            <span className="font-semibold text-brand">{item.slice(0, typedPrefix.length)}</span>
                            {item.slice(typedPrefix.length)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Terminal */}
          <div className="h-[62px] border-t border-line bg-black/50 px-3.5 py-2 font-mono text-[10px] leading-[15px]">
            <div className="flex items-center">
              <span className="text-brand">➜</span>
              <span className="ml-2 text-cyan-300">portfolio</span>
              <span className="ml-1.5 text-violet">git:(</span>
              <span className="text-[#f9a8d4]">main</span>
              <span className="text-violet">)</span>
              <span className="ml-1.5 text-white/85">{phase === 'typing' ? '' : s.command.slice(0, cmdTyped)}</span>
              {(phase === 'typing' || phase === 'command') && <Caret block blink={phase === 'typing'} />}
            </div>
            {phase === 'running' && (
              <div className="text-white/50">
                <span className="text-brand">{SPINNER[spin]}</span> {s.running}
              </div>
            )}
            {phase === 'done' &&
              s.output.slice(0, outLines).map((line) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line.startsWith('✓') || line.startsWith('HTTP') ? 'text-emerald-400' : 'text-white/60'}
                >
                  {line}
                </motion.div>
              ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-brand px-3 py-[3px] font-mono text-[9px] font-medium text-ink">
            <span className="flex items-center gap-3">
              <span>⎇ main</span>
              <span>{phase === 'done' ? '✓ 0 problems' : '◌ 0 problems'}</span>
            </span>
            <span className="flex items-center gap-3">
              <span>
                Ln {caretLine + 1}, Col {caretCol + 1}
              </span>
              <span className="hidden xl:inline">UTF-8</span>
              <span>{s.lang}</span>
            </span>
          </div>
        </div>

        <AnimatePresence>
          {phase === 'done' && outLines >= s.output.length && (
            <motion.div
              key={s.badge}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="absolute -right-3 -bottom-4 rounded-xl border border-brand/40 bg-ink/90 px-3 py-2 font-mono text-[10px] text-brand shadow-[0_10px_30px_-5px_rgba(197,248,42,0.4)] backdrop-blur"
            >
              ✓ {s.badge}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CodeEditorVisual
