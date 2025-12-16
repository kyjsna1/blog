import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { createSupabaseServer } from "@/lib/supabase/server"
import { Article } from "@/lib/types/article"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AdBanner } from "@/components/ad-banner"

interface ArticleWithAuthor extends Article {
  author_email?: string | null
}

async function getArticle(slug: string): Promise<ArticleWithAuthor | null> {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single()

  if (error || !data) return null

  // 공개용: published만 노출
  if (data.status !== "published") {
    return null
  }

  return data as ArticleWithAuthor
}

function formatDate(date: string | null) {
  const d = date ? new Date(date) : null
  if (!d) return ""
  return format(d, "yyyy.MM.dd", { locale: ko })
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes}분`
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const publishedDate = formatDate(article.published_at || article.created_at)
  const readTime = calculateReadTime(article.content)

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/articles" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Link>
          <span className="text-muted-foreground">·</span>
          <span>{publishedDate}</span>
          <span className="text-muted-foreground">·</span>
          <span>{readTime} 읽기</span>
        </div>

        <article className="space-y-8">
          <header className="space-y-4">
            <p className="text-sm text-muted-foreground">Article</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{article.title}</h1>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base text-muted-foreground whitespace-pre-wrap leading-relaxed">{article.excerpt}</p>
            <div className="mt-6 text-base whitespace-pre-wrap leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* AdSense - 아티클 상세 하단 */}
          <AdBanner slotId="8917208046" className="mt-10" />
        </article>
      </div>
    </main>
  )
}

