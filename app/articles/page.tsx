import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "React 18의 새로운 기능 완벽 정리",
    excerpt: "React 18에서 추가된 Concurrent Features와 자동 배칭에 대해 알아봅니다.",
    date: "2024.12.01",
    category: "React",
    readTime: "8분",
  },
  {
    id: 2,
    title: "TypeScript 제네릭 마스터하기",
    excerpt: "제네릭을 활용한 타입 안전한 코드 작성법을 심층적으로 다룹니다.",
    date: "2024.11.28",
    category: "TypeScript",
    readTime: "12분",
  },
  {
    id: 3,
    title: "Next.js App Router 실전 가이드",
    excerpt: "App Router를 활용한 모던 웹 애플리케이션 개발 방법론을 소개합니다.",
    date: "2024.11.25",
    category: "Next.js",
    readTime: "15분",
  },
  {
    id: 4,
    title: "효과적인 상태 관리 전략",
    excerpt: "React 애플리케이션에서 상태를 효율적으로 관리하는 다양한 패턴을 비교합니다.",
    date: "2024.11.20",
    category: "React",
    readTime: "10분",
  },
  {
    id: 5,
    title: "Tailwind CSS 실전 활용법",
    excerpt: "Tailwind CSS를 활용한 빠르고 일관된 UI 개발 방법을 알아봅니다.",
    date: "2024.11.15",
    category: "CSS",
    readTime: "7분",
  },
  {
    id: 6,
    title: "웹 성능 최적화 체크리스트",
    excerpt: "웹 애플리케이션의 성능을 개선하기 위한 필수 체크리스트를 제공합니다.",
    date: "2024.11.10",
    category: "Performance",
    readTime: "11분",
  },
]

const categories = ["All", "React", "TypeScript", "Next.js", "CSS", "Performance"]

export default function ArticlesPage() {
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
          {articles.map((article) => (
            <article
              key={article.id}
              className="group py-8 border-b border-border hover:bg-secondary/30 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
            >
              <Link href={`/articles/${article.id}`} className="block">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-secondary rounded">{article.category}</span>
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
          ))}
        </div>
      </div>
    </main>
  )
}
