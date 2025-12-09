export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: "draft" | "published"
  views: number
  author_id: string
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface ArticleInsert {
  title: string
  slug: string
  content: string
  excerpt?: string
  status: "draft" | "published"
  published_at?: string | null
}

export interface ArticleUpdate {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  status?: "draft" | "published"
  published_at?: string | null
}

