"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/login/actions"

export function LogoutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="outline" size="sm" className="gap-2">
        <LogOut className="h-4 w-4" />
        로그아웃
      </Button>
    </form>
  )
}

