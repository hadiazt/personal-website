import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const rtlLanguages = ['fa', 'ar', 'he', 'ur'];

export function useDirection() {
  const { i18n } = useTranslation();

  const isRtl = rtlLanguages.includes(i18n.language);
  const direction = isRtl ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
    
    if (isRtl) {
      document.documentElement.classList.add('rtl');
      document.body.style.fontFamily = "'Vazirmatn', 'Tahoma', sans-serif";
    } else {
      document.documentElement.classList.remove('rtl');
      document.body.style.fontFamily = "'Outfit', system-ui, sans-serif";
    }
  }, [i18n.language, direction, isRtl]);

  return { isRtl, direction };
}

