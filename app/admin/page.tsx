import { FileText, Users, Eye, TrendingUp } from "lucide-react"

const stats = [
  { label: "Total Articles", value: "52", icon: FileText, change: "+3 this month" },
  { label: "Total Views", value: "24.5K", icon: Eye, change: "+12% from last month" },
  { label: "Subscribers", value: "1,234", icon: Users, change: "+89 new" },
  { label: "Avg. Read Time", value: "4:32", icon: TrendingUp, change: "+0:23" },
]

const recentArticles = [
  { title: "React 18의 새로운 기능 완벽 정리", views: 1234, status: "Published" },
  { title: "TypeScript 제네릭 마스터하기", views: 892, status: "Published" },
  { title: "Next.js App Router 실전 가이드", views: 2341, status: "Published" },
  { title: "효과적인 상태 관리 전략", views: 567, status: "Draft" },
]

export default function AdminPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">블로그 관리 및 통계를 확인하세요.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors w-fit">
            <FileText className="h-4 w-4" />새 글 작성
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Recent Articles Table */}
        <div className="border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">최근 아티클</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Title</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Views</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Status</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{article.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                          article.status === "Published"
                            ? "bg-secondary text-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
