import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Code2, Palette, Zap } from "lucide-react";
import clsx from "clsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const features = [
  {
    icon: Code2,
    title: "Robust APIs",
    description: "Well-documented and scalable backend services",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized server-side code for speed and reliability",
  },
  {
    icon: Palette,
    title: "Database Design",
    description: "Efficient and reliable data models and queries",
  },
  {
    icon: Sparkles,
    title: "Modern UI",
    description:
      "Best-practice, clean and beautiful user interface implementation",
  },
  {
    icon: ArrowRight,
    title: "Responsive Design",
    description: "Fully responsive for any device and screen size",
  },
  {
    icon: Palette,
    title: "Frontend Engineering",
    description:
      "Modern frontend workflows, component architectures, and seamless user experience",
  },
];

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12"
    >
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium border border-primary-500/20">
              <Sparkles className="w-4 h-4" />
              {t("hero.greeting")}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
          >
            <span className="block">{t("hero.name")}</span>
            <span className="gradient-text">{t("hero.title")}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--color-text-secondary)] max-w-lg text-balance"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              {t("hero.learnMore")}
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          variants={itemVariants}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Animated circles */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/30"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-8 rounded-full border-2 border-dashed border-accent-500/30"
            />
            {/* Center - Profile Image as the inner circle */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-16 rounded-full overflow-hidden shadow-2xl shadow-primary-500/40 ring-4 ring-primary-500/30"
            >
              <img
                src="/me.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating elements */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className={clsx(
                  "absolute w-3 h-3 rounded-full",
                  i === 0 && "top-1/4 right-8 bg-primary-500",
                  i === 1 && "bottom-1/3 left-4 bg-accent-500",
                  i === 2 && "top-1/2 right-1/4 bg-primary-400",
                  i === 3 && "bottom-1/4 right-1/3 bg-accent-400"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        className="mt-24 grid sm:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="card group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
              <feature.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {feature.description}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              className="h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mt-4 rounded-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
