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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/utilisateur/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomUtilisateur: formData.nomUtilisateur,
          motDePasse: formData.motDePasse,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setCookie("auth", "authenticated", { maxAge: 60 * 60 * 24 })
        setCookie("admin_auth", "admin_authenticated", { maxAge: 60 * 60 * 24 })
        router.push("/accueil")
      } else {
        const error = await res.json()
        alert(error.error || "Identifiants invalides")
      }
    } catch (err) {
      alert("Erreur réseau")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center shadow-2xl shadow-black p-4">
      <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomUtilisateur" className="text-gray-700 font-medium">Nom d&apos;utilisateur:</Label>
            <Input
              id="nomUtilisateur"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              required
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motDePasse" className="text-gray-700 font-medium">Mot de passe:</Label>
            <Input
              id="motDePasse"
              name="motDePasse"
              type="text"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
              placeholder="Entrez votre mot de passe"
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
