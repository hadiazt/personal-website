import clsx from "clsx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home, Github, User, Mail, Menu, X } from "lucide-react";

import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";

const navItems = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "about", icon: User, labelKey: "nav.about" },
  { id: "github", icon: Github, labelKey: "nav.github" },
  { id: "contact", icon: Mail, labelKey: "nav.contact" },
];

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const isActive = (id: string) => activeSection === id;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav
          className={clsx(
            "px-4 sm:px-6 py-3 rounded-2xl",
            "bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl",
            "border border-[var(--color-border)]",
            "shadow-lg shadow-black/5 dark:shadow-black/20"
          )}
        >
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-display font-semibold text-lg hidden sm:block">
                Portfolio
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
                    isActive(item.id)
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-accent-500"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {t(item.labelKey)}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-[var(--color-bg-tertiary)]"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300",
                    isActive(item.id)
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
