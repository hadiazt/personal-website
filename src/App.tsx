import { motion } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { GitHubStatsPage } from "./pages/GitHubStatsPage";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const App = () => {
  return (
    <Layout>
      {/* Home Section */}
      <motion.section
        id="home"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen"
      >
        <HomePage />
      </motion.section>

      {/* GitHub Stats Section */}
      <motion.section
        id="github"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen pt-24"
      >
        <GitHubStatsPage />
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen pt-24"
      >
        <AboutPage />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen pt-24"
      >
        <ContactPage />
      </motion.section>
    </Layout>
  );
};
