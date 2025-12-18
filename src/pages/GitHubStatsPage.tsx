import {
  Star,
  Users,
  Github,
  Loader2,
  GitFork,
  BookOpen,
  Activity,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const GITHUB_USERNAME = "hadiazt";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  location: string;
  blog: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface GitHubOrganization {
  id: number;
  login: string;
  avatar_url: string;
  description: string;
  url: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

export const GitHubStatsPage = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [organizations, setOrganizations] = useState<GitHubOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributions, setContributions] = useState<ContributionsData | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const userRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        const reposData = await reposRes.json();
        setRepos(reposData);

        // Fetch organizations
        const orgsRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/orgs`
        );
        if (orgsRes.ok) {
          const orgsData = await orgsRes.json();
          setOrganizations(orgsData);
        }

        // Fetch contributions
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`
        );
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          setContributions(contribData);

          // Get available years from the data
          if (contribData.total) {
            const years = Object.keys(contribData.total).sort(
              (a, b) => parseInt(b) - parseInt(a)
            );
            setAvailableYears(years);
            if (years.length > 0) {
              setSelectedYear(years[0]);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Filter contributions by selected year
  const yearContributions = useMemo(() => {
    if (!contributions?.contributions) return [];
    return contributions.contributions.filter((day) =>
      day.date.startsWith(selectedYear)
    );
  }, [contributions, selectedYear]);

  // Group contributions by week
  const contributionWeeks = useMemo(() => {
    if (!yearContributions.length) return [];

    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Fill in missing days at the start to align with Sunday
    const firstDate = new Date(yearContributions[0]?.date);
    const dayOfWeek = firstDate.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }

    yearContributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [yearContributions]);

  const getContributionColor = (level: number, isDark: boolean) => {
    const colors = isDark
      ? ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
      : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
    return colors[level] || colors[0];
  };

  // Calculate stats
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  // Calculate language stats
  const languageStats = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const languageData = Object.entries(languageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({
      name,
      value,
      color: languageColors[name] || "#6366f1",
    }));

  // Top repos by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-primary-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-[var(--color-text-secondary)]">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <Github className="w-8 h-8" />
          {t("github.title")}
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          {t("github.subtitle")}
        </p>
      </motion.div>

      {/* Profile Card */}
      {user && (
        <motion.div variants={itemVariants} className="card">
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
            dir="ltr"
          >
            <motion.img
              src={user.avatar_url}
              alt={user.name}
              className="w-24 h-24 rounded-2xl ring-4 ring-primary-500/20"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex-1 text-center sm:text-start">
              <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
              <p className="text-[var(--color-text-muted)]">@{user.login}</p>
              {user.bio && (
                <p className="text-[var(--color-text-secondary)] mt-2">
                  {user.bio}
                </p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                {user.location && (
                  <span className="text-sm text-[var(--color-text-muted)]">
                    📍 {user.location}
                  </span>
                )}
                {user.blog && (
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-500 hover:underline"
                  >
                    🔗 {user.blog}
                  </a>
                )}
              </div>
              <motion.a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-[var(--color-bg-tertiary)] rounded-xl hover:bg-primary-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("github.viewProfile")}
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: t("github.repos"),
            value: user?.public_repos || 0,
            icon: BookOpen,
            color: "from-primary-500 to-primary-400",
          },
          {
            label: t("github.stars"),
            value: totalStars,
            icon: Star,
            color: "from-amber-500 to-amber-400",
          },
          {
            label: t("github.forks"),
            value: totalForks,
            icon: GitFork,
            color: "from-accent-500 to-accent-400",
          },
          {
            label: t("github.followers"),
            value: user?.followers || 0,
            icon: Users,
            color: "from-pink-500 to-pink-400",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={clsx(
                  "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  stat.color
                )}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Organizations Section */}
      {organizations.length > 0 && (
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-500" />
            {t("github.organizations")}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {organizations.map((org) => (
              <motion.a
                key={org.id}
                href={`https://github.com/${org.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] transition-colors"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={org.avatar_url}
                  alt={org.login}
                  className="w-16 h-16 rounded-xl ring-2 ring-primary-500/20"
                />
                <div className="text-center">
                  <h4 className="font-medium text-sm">{org.login}</h4>
                  {org.description && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                      {org.description}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Charts and Repos Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Languages Pie Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-500" />
            {t("github.languages")}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {languageData.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-[var(--color-text-secondary)]">
                  {lang.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Repos */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            {t("github.topRepos")}
          </h3>
          <div className="space-y-3">
            {topRepos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{repo.name}</h4>
                    {repo.description && (
                      <p className="text-sm text-[var(--color-text-muted)] truncate mt-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] shrink-0 ms-4">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] || "#6366f1",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* GitHub Contribution Graph */}
      <motion.div variants={itemVariants} className="card overflow-hidden">
        {/* Header with year selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-500" />
              {t("github.contributions")}
            </h3>
            {contributions?.total && (
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {contributions.total[selectedYear]?.toLocaleString() || 0}{" "}
                {t("github.contributionsInYear")} {selectedYear}
              </p>
            )}
          </div>
        </div>

        {/* Year Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {availableYears.map((year) => (
            <motion.button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                selectedYear === year
                  ? "bg-primary-500 text-white"
                  : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {year}
              {contributions?.total && (
                <span
                  className={clsx(
                    "ms-2 text-xs",
                    selectedYear === year
                      ? "text-white/70"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  ({contributions.total[year]?.toLocaleString() || 0})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              dir="ltr"
              className="w-full"
            >
              {/* Grid with day labels */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `24px repeat(${contributionWeeks.length}, 1fr)`,
                  gap: "2px",
                }}
              >
                {/* Contribution columns */}
                {contributionWeeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[2px]">
                    {week.map((day, dayIdx) => (
                      <motion.div
                        key={`${weekIdx}-${dayIdx}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: weekIdx * 0.003 }}
                        className={clsx(
                          "aspect-square rounded-sm w-full",
                          day.date &&
                            "cursor-pointer hover:ring-1 hover:ring-primary-500"
                        )}
                        style={{
                          backgroundColor: day.date
                            ? getContributionColor(
                                day.level,
                                document.documentElement.classList.contains(
                                  "dark"
                                )
                              )
                            : "transparent",
                        }}
                        title={
                          day.date
                            ? `${day.date}: ${day.count} ${t(
                                "github.contribution"
                              )}`
                            : ""
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between mt-4 text-xs text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <span>{t("github.less")}</span>
                  <div className="flex gap-[2px]">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: getContributionColor(
                            level,
                            document.documentElement.classList.contains("dark")
                          ),
                        }}
                      />
                    ))}
                  </div>
                  <span>{t("github.more")}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
