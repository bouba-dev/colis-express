"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setCookie } from "cookies-next"

export default function ConnexionAdmin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    motDePasse: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données de connexion admin:", formData)

    // Définir des cookies d'authentification (dans une application réelle, vous utiliseriez un token JWT)
    setCookie("auth", "authenticated", { maxAge: 60 * 60 * 24 }) // 24 heures
    setCookie("admin_auth", "admin_authenticated", { maxAge: 60 * 60 * 24 }) // 24 heures

    // Rediriger vers le tableau de bord admin
    router.push("/accueil")
  }

  return (
    <div className="flex min-h-screen items-center justify-center shadow-2xl shadow-black p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomUtilisateur">Nom d&apos;utilisateur:</Label>
            <Input
              id="nomUtilisateur"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motDePasse">Mot de passe:</Label>
            <Input
              id="motDePasse"
              name="motDePasse"
              type="password"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  )
}
