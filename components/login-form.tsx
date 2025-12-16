"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "@/app/login/actions"

interface LoginFormProps {
  from?: string
}

export function LoginForm({ from = "/admin" }: LoginFormProps) {
  const [state, formAction] = useActionState(signIn, {})

  return (
    <form action={formAction} className="mx-auto flex max-w-md flex-col gap-6 rounded-xl border border-border p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">관리자 로그인</h1>
        <p className="text-sm text-muted-foreground">이메일과 비밀번호로 로그인하세요.</p>
      </div>
      <input type="hidden" name="from" value={from} />
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          이메일
        </label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          비밀번호
        </label>
        <Input id="password" name="password" type="password" required placeholder="********" />
        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      </div>
      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  )
}

