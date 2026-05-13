export type SiteLocale = 'ru' | 'be' | 'kk' | 'en' | 'zh' | 'ce' | 'tt';

export interface LocalizedText {
  ru: string;
  be: string;
  kk: string;
  en: string;
  zh: string;
  ce: string;
  tt: string;
}

export const DEFAULT_LOCALE: SiteLocale = 'ru';
export const LANGUAGE_STORAGE_KEY = 'expoint-site-locale';

export const LANGUAGE_OPTIONS: Array<{
  code: SiteLocale;
  shortLabel: string;
  nativeLabel: string;
}> = [
  { code: 'ru', shortLabel: 'RU', nativeLabel: 'Русский' },
  { code: 'be', shortLabel: 'BE', nativeLabel: 'Беларуская' },
  { code: 'kk', shortLabel: 'KZ', nativeLabel: 'Қазақша' },
  { code: 'en', shortLabel: 'EN', nativeLabel: 'English' },
  { code: 'zh', shortLabel: 'ZH', nativeLabel: '中文' },
  { code: 'ce', shortLabel: 'CE', nativeLabel: 'Нохчийн' },
  { code: 'tt', shortLabel: 'TT', nativeLabel: 'Татарча' },
];

export function t(locale: SiteLocale, text: LocalizedText) {
  return text[locale] ?? text.ru;
}

export const uiCopy = {
  languageLabel: {
    ru: 'Язык',
    be: 'Мова',
    kk: 'Тіл',
    en: 'Language',
    zh: '语言',
    ce: 'Мотт',
    tt: 'Тел',
  },
  themeLight: {
    ru: 'Светлая тема',
    be: 'Светлая тэма',
    kk: 'Жарық тақырып',
    en: 'Light theme',
    zh: '浅色主题',
    ce: 'Сийрда тема',
    tt: 'Якты тема',
  },
  themeDark: {
    ru: 'Темная тема',
    be: 'Цёмная тэма',
    kk: 'Қараңғы тақырып',
    en: 'Dark theme',
    zh: '深色主题',
    ce: 'Бода тема',
    tt: 'Кара тема',
  },
  switchToLight: {
    ru: 'Переключить на светлую тему',
    be: 'Пераключыць на светлую тэму',
    kk: 'Жарық тақырыпқа ауыстыру',
    en: 'Switch to light theme',
    zh: '切换到浅色主题',
    ce: 'Сийрда темана хийца',
    tt: 'Якты темага күчерү',
  },
  switchToDark: {
    ru: 'Переключить на темную тему',
    be: 'Пераключыць на цёмную тэму',
    kk: 'Қараңғы тақырыпқа ауыстыру',
    en: 'Switch to dark theme',
    zh: '切换到深色主题',
    ce: 'Бода темана хийца',
    tt: 'Кара темага күчерү',
  },
} as const;
