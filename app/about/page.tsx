import { Code2, GraduationCap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">About</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            안녕하세요. 개발과 교육을 사랑하는 개발 강사입니다.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">소개</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                10년 이상의 개발 경험과 5년 이상의 교육 경험을 바탕으로, 복잡한 기술 개념을 쉽게 전달하는 것을 목표로
                합니다.
              </p>
              <p>React, TypeScript, Next.js를 주력으로 다루며, 실무에서 바로 적용 가능한 지식을 공유하고자 합니다.</p>
              <p>
                코드의 품질과 개발자 경험을 중요시하며, 효율적이고 유지보수하기 쉬운 코드를 작성하는 방법을 연구합니다.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">기술 스택</h2>
            <div className="grid grid-cols-2 gap-4">
              {["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"].map((skill) => (
                <div key={skill} className="border border-border rounded-lg p-4 text-center text-sm font-medium">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-border pt-16">
          <h2 className="text-2xl font-bold mb-12 text-center">핵심 가치</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">깊이 있는 이해</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                기술의 표면만 다루지 않고, 원리와 동작 방식까지 깊이 있게 탐구합니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">실용적인 교육</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                이론과 실무의 균형을 맞춰, 바로 적용 가능한 지식을 전달합니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">커뮤니티 기여</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                개발 생태계 발전을 위해 지식을 공유하고 함께 성장합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
