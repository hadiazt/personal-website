import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import { Home, Github, User, Mail, Menu, X } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useDirection } from "../hooks/useDirection";

const languageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "about", icon: User, labelKey: "nav.about" },
  { id: "github", icon: Github, labelKey: "nav.github" },
  { id: "contact", icon: Mail, labelKey: "nav.contact" },
];

export function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const { isRtl } = useDirection();
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
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={clsx(
            "absolute -top-40 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl",
            isRtl ? "-left-40" : "-right-40"
          )}
        />
        <div
          className={clsx(
            "absolute top-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl",
            isRtl ? "-right-40" : "-left-40"
          )}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-gradient-to-t from-accent-500/5 via-primary-500/5 to-transparent rounded-full blur-3xl" />

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={clsx(
              "absolute rounded-full blur-sm",
              i % 3 === 0 && "bg-primary-400/40 dark:bg-primary-500/30",
              i % 3 === 1 && "bg-accent-400/40 dark:bg-accent-500/30",
              i % 3 === 2 &&
                "bg-gradient-to-br from-primary-400/35 to-accent-400/35 dark:from-primary-500/25 dark:to-accent-500/25"
            )}
            style={{
              width: `${20 + (i % 6) * 15}px`,
              height: `${20 + (i % 6) * 15}px`,
              left: `${3 + ((i * 7) % 92)}%`,
              top: `${5 + ((i * 11) % 85)}%`,
            }}
            animate={{
              y: [0, -40 - (i % 4) * 15, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5 + (i % 5) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language}
          variants={languageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="relative z-10"
        >
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

          <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>

          <footer className="border-t border-[var(--color-border)] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  © {new Date().getFullYear()} {t("footer.rights")}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                  {t("footer.madeWith")}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ❤️
                  </motion.span>
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
