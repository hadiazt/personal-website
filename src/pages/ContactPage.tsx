import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

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

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
  { icon: Phone, label: 'Phone', value: '+1 234 567 890', href: 'tel:+1234567890' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export function ContactPage() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold mb-4">{t('nav.contact')}</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Let's build something amazing together
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div variants={itemVariants} className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className={clsx(
                  "w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/50",
                  "transition-all duration-300"
                )}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className={clsx(
                  "w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/50",
                  "transition-all duration-300"
                )}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={5}
                className={clsx(
                  "w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/50",
                  "transition-all duration-300"
                )}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                "w-full btn-primary flex items-center justify-center gap-2",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Info Cards */}
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              variants={itemVariants}
              whileHover={{ x: 5, scale: 1.02 }}
              className="card flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <info.icon className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">{info.label}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            </motion.a>
          ))}

          {/* Social Links */}
          <motion.div variants={itemVariants} className="card">
            <h3 className="font-semibold mb-4">Connect with me</h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-[var(--color-bg-tertiary)] hover:bg-primary-500 hover:text-white",
                    "transition-colors duration-300"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            variants={itemVariants}
            className="card h-48 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                </motion.div>
                <p className="font-medium">San Francisco, CA</p>
                <p className="text-sm text-[var(--color-text-muted)]">Available for remote work</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

