"use client"

import { useActionState, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createArticle, updateArticle } from "@/app/admin/articles/actions"
import { Article } from "@/lib/types/article"

interface ArticleFormProps {
  article?: Article
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(article?.title || "")
  const [slug, setSlug] = useState(article?.slug || "")
  const [status, setStatus] = useState<"draft" | "published">(article?.status || "draft")

  const action = article ? updateArticle.bind(null, article.id) : createArticle
  const [state, formAction] = useActionState(action, {})

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!article && !slug) {
      setSlug(generateSlug(newTitle))
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목 *</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
          placeholder="글 제목을 입력하세요"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          placeholder="url-friendly-slug"
        />
        <p className="text-xs text-muted-foreground">
          URL에 사용될 고유한 식별자입니다. 공백은 하이픈(-)으로 변환됩니다.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">요약</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={article?.excerpt || ""}
          rows={3}
          placeholder="글의 요약을 입력하세요"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">본문 *</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={article?.content || ""}
          required
          rows={20}
          placeholder="글의 본문을 입력하세요"
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">상태</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as "draft" | "published")}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft (초안)</SelectItem>
            <SelectItem value="published">Published (발행)</SelectItem>
          </SelectContent>
        </Select>
        <input type="hidden" name="status" value={status} />
      </div>

      {state?.error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
          {state.error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" className="w-fit">
          {article ? "수정하기" : "작성하기"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
        >
          취소
        </Button>
      </div>
    </form>
  )
}

