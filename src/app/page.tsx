import * as motion from "motion/react-client"

type Stat = { title: string; value: string; icon: string; bg: string };
type Post = { title: string; author: string; date: string };
type ChartData = { label: string; posts: number; users: number };

const stats: Stat[] = [
  { title: "Total Users", value: "1,245", icon: "👥", bg: "bg-gradient-to-r from-blue-500 to-purple-500" },
  { title: "Active Users", value: "342", icon: "⚡", bg: "bg-gradient-to-r from-green-400 to-teal-500" },
  { title: "Total Posts", value: "567", icon: "📝", bg: "bg-gradient-to-r from-red-500 to-pink-500" },
  { title: "Comments Today", value: "120", icon: "💬", bg: "bg-gradient-to-r from-yellow-400 to-orange-500" },
];

const recentPosts: Post[] = [
  { title: "How to Learn React Fast", author: "John Doe", date: "Sep 18, 2025" },
  { title: "Next.js 15 Features Overview", author: "Jane Smith", date: "Sep 17, 2025" },
  { title: "Tailwind CSS v4 Tips", author: "Anisul Islam", date: "Sep 16, 2025" },
  { title: "Framer Motion Animation Tricks", author: "Dev Guru", date: "Sep 15, 2025" },
];

const chartData: ChartData[] = [
  { label: "Mon", posts: 5, users: 20 },
  { label: "Tue", posts: 8, users: 25 },
  { label: "Wed", posts: 6, users: 18 },
  { label: "Thu", posts: 10, users: 30 },
  { label: "Fri", posts: 7, users: 22 },
  { label: "Sat", posts: 12, users: 28 },
  { label: "Sun", posts: 9, users: 35 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 pt-20 space-y-6 bg-gray-50 min-h-screen">
      <div
        className="rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Anisul! 👋</h1>
        <p className="mt-2 text-gray-600">Here&apos;s a quick overview of your posts & users.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-xl p-5 text-white shadow-lg ${stat.bg} flex flex-col justify-between`}
          >
            <div className="text-3xl">{stat.icon}</div>
            <div className="mt-4">
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="rounded-lg bg-white p-6 shadow-md lg:col-span-2"
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700">Weekly Activity</h2>
            <p className="text-sm text-gray-500">Posts & user activity over the last week</p>
          </div>
          <div className="flex items-end space-x-2 h-48">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-1">
                <div className="flex flex-row items-end justify-center w-full space-x-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: data.posts * 8 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
                    className="w-full max-w-10 bg-blue-500 rounded-t-lg"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: data.users * 5 }}
                    transition={{ delay: idx * 0.15, type: "spring", stiffness: 120 }}
                    className="w-full max-w-10 bg-green-500 rounded-t-lg"
                  />
                </div>
                <span className="text-xs text-gray-500">{data.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg bg-white shadow-md overflow-y-auto max-h-80 relative"
        >
          <h2 className="text-lg font-semibold text-gray-700 sticky top-0 bg-white px-5 pb-2 pt-4">Recent Posts</h2>
          <ul className="space-y-3 p-5">
            {recentPosts.map((post, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <p className="font-medium text-gray-800">{post.title}</p>
                <p className="text-sm text-gray-500">{post.author} • {post.date}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}