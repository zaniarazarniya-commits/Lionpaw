import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { getTranslation, type Lang, type Translations } from './translations'

const STORAGE_KEY = 'lionpaw-lang'

interface I18nContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
        if (stored === 'sv' || stored === 'en') return stored
      } catch {
        // storage blocked (private mode): fall back to Swedish
      }
    }
    return 'sv'
  })

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang)
      } catch {
        // storage blocked: language still switches for this visit
      }
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = getTranslation(lang)

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLang(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return ctx
}
