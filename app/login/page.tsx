"use server"

import { LoginForm } from "@/components/login-form"

export default async function LoginPage({ searchParams }: { searchParams?: { from?: string } }) {
  const from = searchParams?.from || "/admin"

  return (
    <main className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <LoginForm from={from} />
      </div>
    </main>
  )
}

