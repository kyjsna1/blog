"use client"

import { createBrowserClient } from "@supabase/ssr"

export function createSupabaseBrowser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 추가해주세요."
    )
  }

  if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
    throw new Error(
      `유효하지 않은 Supabase URL입니다: ${supabaseUrl}. URL은 http:// 또는 https://로 시작해야 합니다.`
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

