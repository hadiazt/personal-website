import clsx from "clsx";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(event);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={clsx(
        "relative p-2.5 rounded-xl transition-colors duration-300",
        "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-secondary)]",
        "border border-[var(--color-border)]",
        "overflow-hidden"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-primary-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

