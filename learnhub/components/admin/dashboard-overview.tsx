import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, MessageSquare, TrendingUp, UserPlus, GraduationCap, DollarSign, Activity } from "lucide-react"
import { mockAdminStats } from "@/lib/admin"

export function DashboardOverview() {
  const stats = mockAdminStats

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Courses",
      value: stats.totalCourses.toString(),
      icon: BookOpen,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Community Posts",
      value: stats.totalPosts.toLocaleString(),
      icon: MessageSquare,
      change: "+156",
      changeType: "positive" as const,
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "New Users (Month)",
      value: stats.newUsersThisMonth.toString(),
      icon: UserPlus,
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Course Completions",
      value: stats.courseCompletions.toLocaleString(),
      icon: GraduationCap,
      change: "+15%",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: `$${(stats.revenue / 1000).toFixed(0)}k`,
      icon: DollarSign,
      change: `+${stats.revenueGrowth}%`,
      changeType: "positive" as const,
    },
    {
      title: "Growth Rate",
      value: `${stats.revenueGrowth}%`,
      icon: TrendingUp,
      change: "+2.1%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your platform's performance and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1">
                    <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-gray-500">from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "John Student", action: "Enrolled in Web Development Fundamentals", time: "2 hours ago" },
                { user: "Alice Chen", action: "Completed Data Science Module 3", time: "4 hours ago" },
                { user: "Mike Rodriguez", action: "Posted in Community Forum", time: "6 hours ago" },
                { user: "Emma Wilson", action: "Started UX/UI Design Course", time: "8 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "warning", message: "3 community posts flagged for review", time: "1 hour ago" },
                { type: "info", message: "Server maintenance scheduled for tonight", time: "3 hours ago" },
                { type: "success", message: 'New course "Advanced React" published', time: "5 hours ago" },
                { type: "warning", message: "User account requires verification", time: "7 hours ago" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === "warning"
                        ? "bg-yellow-100"
                        : alert.type === "success"
                          ? "bg-green-100"
                          : "bg-blue-100"
                    }`}
                  >
                    <Activity
                      className={`h-4 w-4 ${
                        alert.type === "warning"
                          ? "text-yellow-600"
                          : alert.type === "success"
                            ? "text-green-600"
                            : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
