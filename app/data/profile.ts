/**
 * Единый источник «фактов для HR». Отсюда расходится в hero, блок фактов,
 * /cv, PDF-резюме, JSON-LD и llms.txt. Подписи — в i18n под ключом `profile.*`.
 */

export type Availability = 'now' | 'two-weeks' | 'month'
export type WorkFormat = 'remote' | 'relocation-eu' | 'hybrid'

export const profile = {
  name: 'Amirjon Fayzilloyev',
  initials: 'AF',
  /** public/me.webp; пока файла нет — Avatar покажет инициалы */
  photo: '/me.webp' as string | null,
  /** JPEG-копия для JSON-LD и OG: не все парсеры читают WebP */
  photoJpg: '/me.jpg' as string | null,
  location: { city: 'Tashkent', country: 'UZ', timezone: 'UTC+5' },
  openToWork: true,
  availability: 'now' as Availability,
  workFormat: ['remote', 'relocation-eu'] as WorkFormat[],
  english: 'B2',
  languages: [
    { code: 'uz', level: 'native' },
    { code: 'ru', level: 'fluent' },
    { code: 'en', level: 'B2' },
  ] as const,
  experienceSince: 2022,
  /** цифры влияния для hero — источник: опыт в KH Agency */
  impact: { activeUsers: '30+', savedPerYear: '$1.9k' },
  cvPdf: { en: '/cv-en.pdf', ru: '/cv-ru.pdf' } as Record<string, string>,
} as const

export const yearsOfExperience = () => new Date().getFullYear() - profile.experienceSince
