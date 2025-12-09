import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Code2,
  Server,
  Database,
  Globe,
  Bot,
  Zap,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorPlay,
  Gamepad2,
  Laptop,
  Computer,
  Briefcase,
  GraduationCap,
  Award,
  Rocket,
  Building2,
  CircuitBoard,
  Mouse,
  Keyboard,
  Headphones,
  Speaker,
  Webcam,
  BoxIcon,
  Fan,
  Power,
  MousePointerSquareDashedIcon,
  Camera,
  X,
  ZoomIn,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skills = [
  {
    key: "runtime",
    icon: Code2,
    items: ["Node.js", "TypeScript", "JavaScript", "Python", "N8N"],
  },
  {
    key: "frameworks",
    icon: Server,
    items: [
      "Nest.js",
      "Express.js",
      "Next.js",
      "React",
      "TailwindCSS",
      "Bootstrap",
      "Material UI",
      "Ant Design",
      "Shadcn UI",
      "EJS",
    ],
  },
  {
    key: "databases",
    icon: Database,
    items: [
      "Prisma",
      "MongoDB",
      "MySQL",
      "SQLServer",
      "PostgreSQL",
      "Redis",
      "SQLite",
      "JSON",
    ],
  },
  {
    key: "realtime",
    icon: Zap,
    items: ["Socket.io", "REST APIs", "WebSockets"],
  },
  {
    key: "bots",
    icon: Bot,
    items: [
      "Discord.js",
      "Telegraf",
      "Electron.js",
      "WhatsApp-Web.js",
      "Instagram-Bot.js",
    ],
  },
  {
    key: "devops",
    icon: Globe,
    items: [
      "Docker",
      "Linux",
      "Git",
      "CI/CD",
      "Heroku",
      "Replit",
      "Cloudflare",
      "Vercel",
      "AWS",
    ],
  },
];

const mySpace = [
  {
    key: "gaming",
    icon: Gamepad2,
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    specs: [
      { key: "os", value: "Windows 11 Pro", icon: Server },
      {
        key: "mainBoard",
        value: "ASUS B760 G ROG STRIX WIFI",
        icon: CircuitBoard,
      },
      { key: "cpu", value: "Intel Core i5-14400F", icon: Cpu },
      { key: "gpu", value: "ASUS RTX5060 Prime OC 8G", icon: MonitorPlay },
      {
        key: "ram",
        value: "Patriot Viper Elite DDR5 5600MHz 16GBx1",
        icon: MemoryStick,
      },
      {
        key: "storage",
        value: "MSI Spatium M470 Pro 1TB M.2",
        icon: HardDrive,
      },
      {
        key: "monitor",
        value:
          "View Sonic XG2709 180Hz(Primary) | Master Tech VY228HS 75Hz(Secondary)",
        icon: Monitor,
      },
      { key: "case", value: "Lian Li LANCOOL 205 Mesh White", icon: BoxIcon },
      {
        key: "cooling",
        value: "Lian Li Galahad II Trinity ARGB White 240mm AIO Liquid Cooler",
        icon: Fan,
      },
      { key: "powerSupply", value: "Deep Cool PF550", icon: Power },
    ],
  },
  {
    key: "dev",
    icon: Laptop,
    gradient: "from-primary-500 via-accent-500 to-cyan-500",
    specs: [
      { key: "os", value: "Linux (Ubuntu 24.04LTS)", icon: Server },
      { key: "mainBoard", value: "Gigabyte H61M-S2P", icon: CircuitBoard },
      { key: "cpu", value: "Intel Core i7-3770 3.40GHz", icon: Cpu },
      { key: "gpu", value: "XFX Radeon RX 580 8GB (👑)", icon: MonitorPlay },
      { key: "ram", value: "Kingston DDR3 1600MHz 4GBx2", icon: MemoryStick },
      {
        key: "storage",
        value:
          "Lexar NS100 512GB SATA III(Primary) | WD Blue 512GB HDD(Secondary)",
        icon: HardDrive,
      },
      { key: "monitor", value: "View Sonic XG2709 180Hz", icon: Monitor },
      { key: "case", value: "Fater FG-520X (💩)", icon: BoxIcon },
      {
        key: "cooling",
        value: "Cooler Master Blue Light",
        icon: Fan,
      },
      { key: "powerSupply", value: "Gigabyte GP-P550B", icon: Power },
    ],
  },
];

// Peripherals
const peripherals = [
  {
    key: "mouse",
    icon: Mouse,
    gradient: "from-violet-500 to-purple-600",
    value: "Razer Viper Mini, Logitech MK240",
  },
  {
    key: "mousePad",
    icon: MousePointerSquareDashedIcon,
    gradient: "from-violet-500 to-purple-600",
    value: "Razer FireFly V2 Pro",
  },
  {
    key: "keyboard",
    icon: Keyboard,
    gradient: "from-blue-500 to-cyan-500",
    value: "Redragon K552 kumara, Logitech MK240",
  },
  {
    key: "headset",
    icon: Headphones,
    gradient: "from-pink-500 to-rose-500",
    value: "Razer V2 X USB, JBL Tune 770 NC",
  },
  {
    key: "speaker",
    icon: Speaker,
    gradient: "from-amber-500 to-orange-500",
    value: "Redragon Adiemus GS560W",
  },
  {
    key: "webcam",
    icon: Webcam,
    gradient: "from-red-500 to-pink-500",
    value: "DJI OSMO MOBILE SE",
  },
];

// Timeline - Experience & Education
const timeline = [
  {
    key: "job1",
    year: "2024",
    icon: Briefcase,
    gradient: "from-primary-500 to-accent-500",
  },
  {
    key: "job2",
    year: "2023",
    icon: Rocket,
    gradient: "from-orange-500 to-red-500",
  },
  {
    key: "job3",
    year: "2022",
    icon: Building2,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    key: "education1",
    year: "2021",
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    key: "award1",
    year: "2020",
    icon: Award,
    gradient: "from-yellow-500 to-orange-500",
  },
];

export function AboutPage() {
  const { t } = useTranslation();
  const [showSetupImage, setShowSetupImage] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16"
    >
      {/* Setup Image Modal */}
      <AnimatePresence>
        {showSetupImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSetupImage(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setShowSetupImage(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full cursor-default"
            >
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-2xl blur-sm opacity-75" />

              {/* Image wrapper */}
              <div className="relative bg-[var(--color-bg-secondary)] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1920&q=80"
                  alt="My Setup"
                  className="w-full h-auto rounded-2xl"
                />

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-center font-medium">
                    {t("about.setupCaption")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Skills Grid */}
      <motion.div variants={containerVariants}>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-display font-bold mb-8 text-center"
        >
          {t("about.skills")}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.key}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                  <skill.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-lg">
                  {t(`about.skillCategories.${skill.key}`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-sm bg-[var(--color-bg-tertiary)] rounded-lg"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline - Experience */}
      <motion.div variants={containerVariants}>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-display font-bold mb-8 text-center flex items-center justify-center gap-3"
        >
          <Briefcase className="w-7 h-7 text-primary-500" />
          {t("about.experience")}
        </motion.h2>

        {/* Horizontal Scrollable Timeline */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-x-auto pb-4 scrollbar-thin"
          dir="ltr"
        >
          <div className="flex gap-6 min-w-max px-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative flex flex-col items-center"
              >
                {/* Card */}
                <div className="card w-72 relative overflow-hidden group">
                  {/* Top Gradient */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.gradient}`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Year Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${item.gradient} text-white`}
                  >
                    {item.year}
                  </span>

                  {/* Content */}
                  <h3 className="font-bold text-lg mb-1">
                    {t(`about.timeline.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-primary-500 font-medium mb-2">
                    {t(`about.timeline.${item.key}.company`)}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">
                    {t(`about.timeline.${item.key}.description`)}
                  </p>

                  {/* Decorative blur */}
                  <div
                    className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                  />
                </div>

                {/* Timeline Connector */}
                {index < timeline.length - 1 && (
                  <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              ← {t("about.scrollToSee")} →
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* My Space - System Specs */}
      <motion.div variants={containerVariants}>
        <motion.div
          variants={itemVariants}
          className="flex flex-col  items-center justify-center gap-4 mb-8"
        >
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <span className="text-3xl">
                <Computer />
              </span>
              {t("about.mySpace")}
            </h2>

            {/* View Setup Button */}
            <motion.button
              onClick={() => setShowSetupImage(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              <Camera className="w-5 h-5" />
              {t("about.viewSetup")}
              <ZoomIn className="w-4 h-4 opacity-70" />
            </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {mySpace.map((system) => (
            <motion.div
              key={system.key}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="card overflow-hidden relative group"
            >
              {/* Gradient Header */}
              <div
                className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${system.gradient}`}
              />

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${system.gradient} flex items-center justify-center shadow-lg`}
                >
                  <system.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl">
                    {t(`about.systems.${system.key}.name`)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {t(`about.systems.${system.key}.description`)}
                  </p>
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-3">
                {system.specs.map((spec, specIdx) => (
                  <motion.div
                    key={spec.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * specIdx }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-primary)] flex items-center justify-center">
                      <spec.icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                        {t(`about.specs.${spec.key}`)}
                      </p>
                      <p className="font-medium text-sm" dir="ltr">
                        {spec.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${system.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}
              />
            </motion.div>
          ))}
        </div>

        {/* Peripherals Box */}
        <motion.div
          variants={itemVariants}
          className="mt-8 card overflow-hidden relative"
        >
          {/* Gradient Header */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-amber-500" />

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-amber-500 flex items-center justify-center shadow-lg"
            >
              <Mouse className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl">
                {t("about.peripherals.title")}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {t("about.peripherals.description")}
              </p>
            </div>
          </div>

          {/* Peripherals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {peripherals.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] transition-all text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                  {t(`about.peripherals.${item.key}`)}
                </p>
                <p className="font-medium text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Decorative blur */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 opacity-5 blur-2xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
