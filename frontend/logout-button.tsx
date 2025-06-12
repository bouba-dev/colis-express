"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "cookies-next"

interface LogoutButtonProps {
  variant?: "default" | "outline"
  className?: string
}

export function LogoutButton({ variant = "default", className = "" }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = () => {
    // Supprimer les cookies d'authentification
    deleteCookie("auth")
    deleteCookie("admin_auth")

    // Rediriger vers la page d'accueil
    router.push("/")
  }

  return (
    <Button variant={variant} className={className} onClick={handleLogout}>
      Déconnexion
    </Button>
  )
}
