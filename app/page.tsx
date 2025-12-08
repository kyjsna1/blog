import Link from "next/link"
import { ArrowRight } from "lucide-react"

const featuredArticles = [
  {
    id: 1,
    title: "React 18의 새로운 기능 완벽 정리",
    excerpt: "React 18에서 추가된 Concurrent Features와 자동 배칭에 대해 알아봅니다.",
    date: "2024.12.01",
    category: "React",
  },
  {
    id: 2,
    title: "TypeScript 제네릭 마스터하기",
    excerpt: "제네릭을 활용한 타입 안전한 코드 작성법을 심층적으로 다룹니다.",
    date: "2024.11.28",
    category: "TypeScript",
  },
  {
    id: 3,
    title: "Next.js App Router 실전 가이드",
    excerpt: "App Router를 활용한 모던 웹 애플리케이션 개발 방법론을 소개합니다.",
    date: "2024.11.25",
    category: "Next.js",
  },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              개발의 본질을 탐구하고, <br className="hidden md:block" />
              지식을 나눕니다.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              프론트엔드 개발과 교육에 대한 깊이 있는 인사이트를 공유합니다. 실무 경험과 이론을 바탕으로 한 양질의
              콘텐츠를 만나보세요.
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
            >
              아티클 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">최근 아티클</h2>
            <Link
              href="/articles"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              전체 보기
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="group border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium px-2 py-1 bg-secondary rounded">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:underline underline-offset-4">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Published Articles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Students Taught</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
