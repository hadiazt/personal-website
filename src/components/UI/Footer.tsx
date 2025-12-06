import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
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
  );
}

