import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-300",
          "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-secondary)]",
          "border border-[var(--color-border)]"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Languages className="w-4 h-4 text-[var(--color-text-secondary)]" />
        <span className="text-sm font-medium">{currentLang.flag}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "absolute top-full mt-2 py-2 min-w-[140px] rounded-xl",
              "bg-[var(--color-bg-secondary)] border border-[var(--color-border)]",
              "shadow-xl shadow-black/10 dark:shadow-black/30",
              "z-50",
              "ltr:right-0 rtl:left-0"
            )}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                  "hover:bg-[var(--color-bg-tertiary)]",
                  lang.code === i18n.language && "text-primary-500 font-medium"
                )}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
