import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Carica la lingua salvata o default italiano
    const savedLanguage = localStorage.getItem('preferredLanguage')
    return savedLanguage || 'it'
  })

  useEffect(() => {
    // Salva la lingua preferita
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

