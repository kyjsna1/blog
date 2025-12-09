import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import { ArticleForm } from "@/components/article-form"
import { Article } from "@/lib/types/article"

async function getArticle(id: string, userId: string): Promise<Article | null> {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("author_id", userId)
    .single()

  if (error || !data) return null
  return data as Article
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/login?from=/admin")
  }

  const article = await getArticle(id, data.user.id)

  if (!article) {
    redirect("/admin")
  }

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">글 수정</h1>
          <p className="text-muted-foreground">블로그 글을 수정하세요.</p>
        </div>
        <ArticleForm article={article} />
      </div>
    </main>
  )
}

