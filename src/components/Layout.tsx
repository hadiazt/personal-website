import clsx from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "./UI/Header";
import { Footer } from "./UI/Footer";
import { useDirection } from "../hooks/useDirection";

const languageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { i18n } = useTranslation();
  const { isRtl } = useDirection();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Background Effects */}
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

        {/* Floating Bubbles */}
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

      {/* Main Content with Language Transition */}
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
          <Header />

          <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
