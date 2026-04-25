import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
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
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (stored === 'sv' || stored === 'en') return stored
    }
    return 'sv'
  })

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }, [])

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
