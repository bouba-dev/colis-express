"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Inscription() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    role: "client", // ou "admin" si tu veux créer un admin
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Appel à l'API backend pour créer l'utilisateur
    const res = await fetch("http://localhost:3000/api/utilisateur", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      alert("Inscription réussie !")
      router.push("/connexion")
    } else {
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl shadow-black">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
        <div className="mb-6 border-b border-t border-gray-200 py-2 text-center">
          <h2 className="text-xl font-medium text-blue-600">Inscription</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Prénom et nom</Label>
            <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mot_de_passe">Mot de passe</Label>
            <Input
              id="mot_de_passe"
              name="mot_de_passe"
              type="password"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
            />
          </div>
          {/* Tu peux ajouter un champ pour le rôle si besoin */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            S&apos;inscrire
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <a href="/connexion" className="text-amber-500 hover:underline">
            Connectez-vous
          </a>
        </div>
      </div>
    </div>
  )
}
