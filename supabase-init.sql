-- 블로그 글 테이블 생성
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 정책 1: 모든 사용자는 Published 글을 읽을 수 있음
CREATE POLICY "Anyone can view published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

-- 정책 2: 인증된 사용자는 자신이 작성한 Draft 글을 읽을 수 있음
CREATE POLICY "Users can view their own draft articles"
  ON articles
  FOR SELECT
  USING (
    auth.uid() = author_id AND status = 'draft'
  );

-- 정책 3: 인증된 사용자는 글을 작성할 수 있음
CREATE POLICY "Authenticated users can insert articles"
  ON articles
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- 정책 4: 작성자는 자신의 글을 수정할 수 있음
CREATE POLICY "Authors can update their own articles"
  ON articles
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- 정책 5: 작성자는 자신의 글을 삭제할 수 있음
CREATE POLICY "Authors can delete their own articles"
  ON articles
  FOR DELETE
  USING (auth.uid() = author_id);

-- slug 자동 생성 함수 (선택사항)
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- 한글과 영문을 포함한 slug 생성
  slug := lower(regexp_replace(title, '[^a-zA-Z0-9가-힣\s]', '', 'g'));
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := trim(both '-' from slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- 예시 데이터 삽입 (선택사항 - 테스트용)
-- 주의: author_id는 실제 사용자 UUID로 변경해야 합니다
-- INSERT INTO articles (title, slug, content, excerpt, status, author_id, published_at)
-- VALUES 
--   ('React 18의 새로운 기능 완벽 정리', 'react-18-new-features', 'React 18의 새로운 기능들에 대해 자세히 알아보겠습니다...', 'React 18에서 추가된 주요 기능들을 정리했습니다.', 'published', 'YOUR_USER_UUID_HERE', NOW()),
--   ('TypeScript 제네릭 마스터하기', 'typescript-generics', 'TypeScript의 제네릭에 대해 깊이 있게 다뤄보겠습니다...', 'TypeScript 제네릭의 모든 것을 배워보세요.', 'published', 'YOUR_USER_UUID_HERE', NOW()),
--   ('Next.js App Router 실전 가이드', 'nextjs-app-router', 'Next.js의 새로운 App Router를 활용한 실전 가이드입니다...', 'App Router로 더 나은 Next.js 앱을 만들어보세요.', 'published', 'YOUR_USER_UUID_HERE', NOW()),
--   ('효과적인 상태 관리 전략', 'state-management', 'React 애플리케이션에서 효과적인 상태 관리 방법을 알아봅니다...', '상태 관리의 베스트 프랙티스를 배워보세요.', 'draft', 'YOUR_USER_UUID_HERE', NULL);

