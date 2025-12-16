import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"
import { Article } from "@/lib/types/article"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AdBanner } from "@/components/ad-banner"

async function getPublishedArticles() {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })

  if (error || !data) return []
  return data as Article[]
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes}분`
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles()

  const formattedArticles = articles.map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt || article.content.substring(0, 150) + "...",
    date: article.published_at
      ? format(new Date(article.published_at), "yyyy.MM.dd", { locale: ko })
      : format(new Date(article.created_at), "yyyy.MM.dd", { locale: ko }),
    readTime: calculateReadTime(article.content),
    slug: article.slug,
  }))

  const categories = ["All"]
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Articles</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            개발에 대한 깊이 있는 글들을 만나보세요. 실무 경험과 연구를 바탕으로 작성된 아티클입니다.
          </p>
        </div>

        {/* AdSense - 모든 아티클 상단 */}
        <AdBanner slotId="8077757331" className="mb-8" />

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors first:bg-foreground first:text-background"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-0 border-t border-border">
          {formattedArticles.length > 0 ? (
            formattedArticles.map((article) => (
              <article
                key={article.id}
                className="group py-8 border-b border-border hover:bg-secondary/30 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
              >
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <span className="text-xs text-muted-foreground">· {article.readTime} 읽기</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:underline underline-offset-4">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              아직 발행된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
