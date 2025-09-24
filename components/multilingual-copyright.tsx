"use client"

import { useState, useEffect } from "react"

const copyrightTranslations = {
  en: "© 2025 SAMUDRASETU. A Government of India Initiative.",
  hi: "© 2025 समुद्रसेतु। भारत सरकार की एक पहल।",
  gu: "© 2025 સમુદ્રસેતુ। ભારત સરકારની એક પહેલ।",
  mr: "© 2025 समुद्रसेतु। भारत सरकाराचा एक उपक्रम।",
  bn: "© 2025 সমুদ্রসেতু। ভারত সরকারের একটি উদ্যোগ।",
  ta: "© 2025 சமுத்ரசேது। இந்திய அரசின் ஒரு முயற்சி।",
  te: "© 2025 సముద్రసేతు। భారత ప్రభుత్వ చొరవ।",
  kn: "© 2025 ಸಮುದ್ರಸೇತು। ಭಾರತ ಸರ್ಕಾರದ ಒಂದು ಉಪಕ್ರಮ।",
  ml: "© 2025 സമുദ്രസേതു। ഇന്ത്യാ ഗവൺമെന്റിന്റെ ഒരു സംരംഭം।",
  or: "© 2025 ସମୁଦ୍ରସେତୁ। ଭାରତ ସରକାରଙ୍କ ଏକ ପଦକ୍ଷେପ।",
  pa: "© 2025 ਸਮੁਦ੍ਰਸੇਤੁ। ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਇੱਕ ਪਹਿਲਕਦਮੀ।",
  as: "© 2025 সমুদ্ৰসেতু। ভাৰত চৰকাৰৰ এক পদক্ষেপ।",
}

export function MultilingualCopyright() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Get the selected language from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setCurrentLanguage(savedLanguage)

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedLanguage" && e.newValue) {
        setCurrentLanguage(e.newValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <div className="text-sm text-muted-foreground">
      {copyrightTranslations[currentLanguage as keyof typeof copyrightTranslations] || copyrightTranslations.en}
    </div>
  )
}
