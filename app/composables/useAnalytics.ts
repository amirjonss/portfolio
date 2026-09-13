/**
 * Цели Метрики. Безопасно вызывать где угодно: без счётчика и в dev — no-op.
 *
 *   const { goal, trackSection } = useAnalytics()
 *   goal('cv_pdf')                       // событие
 *   goal('demo_open', { project: 'warehouse' })
 *   trackSection(el, 'scroll_projects')  // один раз, когда блок попал в экран
 *
 * Список целей (создать в Метрике → Цели → JavaScript-событие):
 *   cv_pdf · demo_open · contact_click · lang_switch · scroll_projects · scroll_contact
 */
export function useAnalytics() {
  const ymId = Number(useRuntimeConfig().public.ymId || 0)

  const goal = (name: string, params?: Record<string, string>) => {
    if (import.meta.server || !ymId || !window.ym) return
    window.ym(ymId, 'reachGoal', name, params)
  }

  const trackSection = (el: Element | null, name: string) => {
    if (import.meta.server || !el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { goal(name); io.disconnect() }
    }, { threshold: 0.1 })   // 10 %: секция проектов высокая, 30 % в экран не влезает
    io.observe(el)
    onBeforeUnmount(() => io.disconnect())
  }

  return { goal, trackSection }
}
