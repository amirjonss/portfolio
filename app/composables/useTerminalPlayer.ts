import { scenes, type LineKind, type TerminalLine } from '~/data/terminal'

export interface RenderedLine {
  kind: LineKind
  text: string
}

/** максимум строк в DOM — старые всё равно уехали за пределы окна */
const MAX_LINES = 70
const CHAR_MIN = 26
const CHAR_JITTER = 34
const AFTER_CMD = 340
const BETWEEN_CYCLES = 3200

/**
 * Проигрывает сценарий терминала.
 *
 * - печатает команды посимвольно, вывод отдаёт строкой;
 * - встаёт на паузу, когда терминал уходит за пределы экрана
 *   (без таймеров в фоне — ждём на промисе, а не поллингом);
 * - при prefers-reduced-motion показывает статичный кадр и не анимирует;
 * - вся работа только в onMounted, поэтому безопасно для SSR/SSG.
 */
export function useTerminalPlayer() {
  const lines = ref<RenderedLine[]>([])
  /** команда, которая печатается прямо сейчас (без промпта) */
  const partial = ref<string | null>(null)
  const screen = ref<HTMLElement | null>(null)
  const viewport = ref<HTMLElement | null>(null)

  let alive = false
  let paused = false
  let resume: (() => void) | null = null
  let timer: ReturnType<typeof setTimeout> | null = null
  let observer: IntersectionObserver | null = null

  const sleep = (ms: number) =>
    new Promise<void>((res) => {
      timer = setTimeout(res, ms)
    })

  /** ждёт, пока терминал снова окажется на экране; в паузе таймеров нет */
  const gate = () => {
    if (!paused || !alive) return Promise.resolve()
    return new Promise<void>((res) => {
      resume = res
    })
  }

  const scrollDown = async () => {
    await nextTick()
    if (viewport.value) viewport.value.scrollTop = viewport.value.scrollHeight
  }

  const push = (line: RenderedLine) => {
    lines.value.push(line)
    if (lines.value.length > MAX_LINES) lines.value.splice(0, lines.value.length - MAX_LINES)
  }

  async function typeCommand(text: string) {
    partial.value = ''
    for (const char of text) {
      if (!alive) return
      await gate()
      partial.value += char
      await scrollDown()
      await sleep(CHAR_MIN + Math.random() * CHAR_JITTER)
    }
    partial.value = null
    push({ kind: 'cmd', text })
    await scrollDown()
    await sleep(AFTER_CMD)
  }

  async function emit(line: TerminalLine) {
    push({ kind: line.kind, text: line.text ?? '' })
    await scrollDown()
    await sleep(line.pause ?? 300)
  }

  /** статичный кадр для тех, кто отключил анимации */
  function renderStatic() {
    for (const scene of scenes) {
      if (scene.id !== 'whoami' && scene.id !== 'ps') continue
      for (const line of scene.lines) {
        push({ kind: line.kind, text: line.text ?? '' })
      }
    }
  }

  async function loop() {
    while (alive) {
      for (const scene of scenes) {
        for (const line of scene.lines) {
          if (!alive) return
          await gate()
          if (line.kind === 'cmd') await typeCommand(line.text ?? '')
          else await emit(line)
        }
      }
      if (!alive) return
      await gate()
      await sleep(BETWEEN_CYCLES)
      lines.value = []
    }
  }

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      renderStatic()
      return
    }

    alive = true

    if (viewport.value && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry?.isIntersecting ?? true
          paused = !visible
          if (visible && resume) {
            const r = resume
            resume = null
            r()
          }
        },
        { threshold: 0 },
      )
      observer.observe(viewport.value)
    }

    loop()
  })

  onBeforeUnmount(() => {
    alive = false
    paused = false
    if (timer) clearTimeout(timer)
    if (resume) resume()
    observer?.disconnect()
  })

  return { lines, partial, screen, viewport }
}
