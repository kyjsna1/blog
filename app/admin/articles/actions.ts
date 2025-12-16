"use server"

import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import { ArticleInsert, ArticleUpdate } from "@/lib/types/article"

export interface ActionState {
  error?: string
  success?: boolean
}

export async function createArticle(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState | void> {
  if (!(formData instanceof FormData)) {
    return { error: "잘못된 요청입니다. 다시 시도해주세요." }
  }

  const supabase = await createSupabaseServer()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    redirect("/login?from=/admin/articles/new")
  }

  const title = formData.get("title")?.toString() ?? ""
  const slug = formData.get("slug")?.toString() ?? ""
  const content = formData.get("content")?.toString() ?? ""
  const excerpt = formData.get("excerpt")?.toString() ?? ""
  const status = (formData.get("status")?.toString() ?? "draft") as "draft" | "published"
  const publishedAt = status === "published" ? new Date().toISOString() : null

  const article: ArticleInsert = {
    title,
    slug,
    content,
    excerpt: excerpt || null,
    status,
    published_at: publishedAt,
  }

  const { error } = await supabase
    .from("articles")
    .insert({
      ...article,
      author_id: userData.user.id,
    })

  if (error) {
    return { error: error.message }
  }

  redirect("/admin")
}

export async function updateArticle(
  id: string,
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState | void> {
  if (!(formData instanceof FormData)) {
    return { error: "잘못된 요청입니다. 다시 시도해주세요." }
  }

  const supabase = await createSupabaseServer()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    redirect("/login?from=/admin")
  }

  const title = formData.get("title")?.toString()
  const slug = formData.get("slug")?.toString()
  const content = formData.get("content")?.toString()
  const excerpt = formData.get("excerpt")?.toString()
  const status = formData.get("status")?.toString() as "draft" | "published" | undefined
  const publishedAt = status === "published" ? new Date().toISOString() : null

  const updateData: ArticleUpdate = {}
  if (title) updateData.title = title
  if (slug) updateData.slug = slug
  if (content) updateData.content = content
  if (excerpt !== undefined) updateData.excerpt = excerpt || null
  if (status) updateData.status = status
  if (status === "published" && publishedAt) updateData.published_at = publishedAt

  const { error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id)
    .eq("author_id", userData.user.id)

  if (error) {
    return { error: error.message }
  }

  redirect("/admin")
}

export async function deleteArticle(
  id: string
): Promise<ActionState | void> {
  const supabase = await createSupabaseServer()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    redirect("/login?from=/admin")
  }

  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id)
    .eq("author_id", userData.user.id)

  if (error) {
    return { error: error.message }
  }

  redirect("/admin")
}

