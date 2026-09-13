/**
 * Образование, курсы и сертификаты. Секция на главной, пункт меню и блок
 * в /cv появляются только когда массив непустой. Тексты названий — здесь
 * (имена собственные не переводятся), подписи статусов — в i18n `education.*`.
 */

export interface Education {
  id: string
  title: string
  issuer: string
  /** YYYY-MM */
  from: string
  /** null = в процессе */
  to: string | null
  status: 'in-progress' | 'completed'
  location: string | null
  url: string | null
}

export const education: Education[] = [
  {
    id: 'school21',
    title: 'School 21',
    issuer: 'School 21 · Samarkand campus',
    from: '2024-08',
    to: null,
    status: 'in-progress',
    location: 'Samarkand',
    url: 'https://21-school.uz',
  },
]
