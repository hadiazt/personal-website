import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Users, DollarSign, Eye, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

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

const monthlyData = [
  { name: "Jan", visits: 4000, users: 2400, revenue: 2400 },
  { name: "Feb", visits: 3000, users: 1398, revenue: 2210 },
  { name: "Mar", visits: 2000, users: 9800, revenue: 2290 },
  { name: "Apr", visits: 2780, users: 3908, revenue: 2000 },
  { name: "May", visits: 1890, users: 4800, revenue: 2181 },
  { name: "Jun", visits: 2390, users: 3800, revenue: 2500 },
  { name: "Jul", visits: 3490, users: 4300, revenue: 2100 },
  { name: "Aug", visits: 4000, users: 5300, revenue: 2800 },
  { name: "Sep", visits: 3200, users: 4100, revenue: 2600 },
  { name: "Oct", visits: 2800, users: 3600, revenue: 2400 },
  { name: "Nov", visits: 3600, users: 4800, revenue: 2900 },
  { name: "Dec", visits: 4200, users: 5200, revenue: 3200 },
];

const trafficData = [
  { name: "Direct", value: 400, color: "#6366f1" },
  { name: "Social", value: 300, color: "#10b981" },
  { name: "Referral", value: 200, color: "#818cf8" },
  { name: "Organic", value: 278, color: "#34d399" },
];

const stats = [
  {
    key: "totalVisits",
    value: "48.5K",
    change: "+12.5%",
    icon: Eye,
    color: "from-primary-500 to-primary-400",
  },
  {
    key: "activeUsers",
    value: "12.8K",
    change: "+8.2%",
    icon: Users,
    color: "from-accent-500 to-accent-400",
  },
  {
    key: "revenue",
    value: "$24.5K",
    change: "+15.3%",
    icon: DollarSign,
    color: "from-primary-600 to-primary-500",
  },
  {
    key: "growth",
    value: "23.5%",
    change: "+4.1%",
    icon: TrendingUp,
    color: "from-accent-600 to-primary-500",
  },
];

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold">
          {t("dashboard.title")}
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          {t("dashboard.subtitle")}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.key}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">
                  {t(`dashboard.${stat.key}`)}
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
            <div className="flex items-center gap-1 mt-3 text-sm">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                {stat.change}
              </span>
              <span className="text-[var(--color-text-muted)]">
                vs last month
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6">{t("dashboard.monthlyStats")}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-text-muted)"
                  fontSize={12}
                />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6">
            {t("dashboard.trafficSources")}
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6">Revenue Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-text-muted)"
                  fontSize={12}
                />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold mb-6">User Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-text-muted)"
                  fontSize={12}
                />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
