import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Palette, Server, Database, Globe, Smartphone } from 'lucide-react';

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
  { name: 'Frontend', icon: Code2, items: ['React', 'Vue', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', icon: Server, items: ['Node.js', 'Python', 'Go', 'REST APIs'] },
  { name: 'Database', icon: Database, items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
  { name: 'Design', icon: Palette, items: ['Figma', 'UI/UX', 'Responsive', 'Animation'] },
  { name: 'DevOps', icon: Globe, items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
  { name: 'Mobile', icon: Smartphone, items: ['React Native', 'Flutter', 'iOS', 'Android'] },
];

const timeline = [
  { year: '2024', title: 'Senior Developer', company: 'Tech Corp', description: 'Leading frontend architecture' },
  { year: '2022', title: 'Full Stack Developer', company: 'Startup Inc', description: 'Building scalable applications' },
  { year: '2020', title: 'Junior Developer', company: 'Agency Co', description: 'Learning and growing' },
];

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16"
    >
      {/* Hero */}
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30"
        >
          <span className="text-5xl">👨‍💻</span>
        </motion.div>
        <h1 className="text-4xl font-display font-bold mb-4">{t('about.title')}</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">{t('about.description')}</p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-2xl font-display font-bold mb-8 text-center">
          Skills & Expertise
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                  <skill.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
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

      {/* Timeline */}
      <motion.div variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-2xl font-display font-bold mb-8 text-center">
          Experience
        </motion.h2>
        <div className="relative max-w-2xl mx-auto">
          {/* Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300" />
          
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              variants={itemVariants}
              className={`relative flex items-center gap-8 mb-8 ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-[var(--color-bg-primary)] z-10"
              />
              
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] card"
              >
                <span className="text-sm text-primary-500 font-semibold">{item.year}</span>
                <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm">{item.company}</p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-2">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div variants={containerVariants} className="text-center">
        <motion.h2 variants={itemVariants} className="text-2xl font-display font-bold mb-8">
          Fun Facts
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '5+', label: 'Years Experience' },
            { number: '∞', label: 'Cups of Coffee' },
          ].map((fact, index) => (
            <motion.div
              key={fact.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 + index * 0.1 }}
                className="text-4xl font-bold gradient-text"
              >
                {fact.number}
              </motion.span>
              <p className="text-[var(--color-text-muted)] mt-2">{fact.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

