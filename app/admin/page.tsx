import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText, Users, Eye, TrendingUp, Edit } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"
import { LogoutButton } from "@/components/logout-button"
import { Article } from "@/lib/types/article"

async function getStats(userId: string) {
  const supabase = await createSupabaseServer()
  
  const { data: articles } = await supabase
    .from("articles")
    .select("views, status, created_at")
    .eq("author_id", userId)

  if (!articles) return null

  const totalArticles = articles.length
  const publishedArticles = articles.filter((a) => a.status === "published").length
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0)
  const thisMonth = new Date()
  thisMonth.setDate(1)
  const thisMonthArticles = articles.filter(
    (a) => new Date(a.created_at) >= thisMonth
  ).length

  return {
    totalArticles,
    publishedArticles,
    totalViews,
    thisMonthArticles,
  }
}

async function getRecentArticles(userId: string) {
  const supabase = await createSupabaseServer()
  
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false })
    .limit(10)

  return articles as Article[] | null
}

export default async function AdminPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()
  
  if (!data.user) {
    redirect(`/login?from=/admin`)
  }

  const stats = await getStats(data.user.id)
  const recentArticles = await getRecentArticles(data.user.id)

  const statsData = stats
    ? [
        {
          label: "Total Articles",
          value: stats.totalArticles.toString(),
          icon: FileText,
          change: `+${stats.thisMonthArticles} this month`,
        },
        {
          label: "Published",
          value: stats.publishedArticles.toString(),
          icon: FileText,
          change: `${stats.totalArticles - stats.publishedArticles} drafts`,
        },
        {
          label: "Total Views",
          value: stats.totalViews.toLocaleString(),
          icon: Eye,
          change: "All time",
        },
        {
          label: "Avg. Views",
          value:
            stats.totalArticles > 0
              ? Math.round(stats.totalViews / stats.totalArticles).toString()
              : "0",
          icon: TrendingUp,
          change: "Per article",
        },
      ]
    : [
        { label: "Total Articles", value: "0", icon: FileText, change: "No articles" },
        { label: "Published", value: "0", icon: FileText, change: "No articles" },
        { label: "Total Views", value: "0", icon: Eye, change: "No views" },
        { label: "Avg. Views", value: "0", icon: TrendingUp, change: "No data" },
      ]
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">블로그 관리 및 통계를 확인하세요.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors w-fit"
            >
              <FileText className="h-4 w-4" />새 글 작성
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {statsData.map((stat) => (
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
                {recentArticles && recentArticles.length > 0 ? (
                  recentArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium">{article.title}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {article.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                            article.status === "published"
                              ? "bg-secondary text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {article.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-muted-foreground">
                      작성된 글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
