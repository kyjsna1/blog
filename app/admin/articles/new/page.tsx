import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import { ArticleForm } from "@/components/article-form"

export default async function NewArticlePage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/login?from=/admin/articles/new")
  }

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">새 글 작성</h1>
          <p className="text-muted-foreground">새로운 블로그 글을 작성하세요.</p>
        </div>
        <ArticleForm />
      </div>
    </main>
  )
}

