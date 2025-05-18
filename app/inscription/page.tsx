"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function Inscription() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    contact: "",
    adresse: "",
    motDePasse: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    const router = useRouter()
    router.push("/connexion")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données d'inscription:", formData)
    // Ici, vous ajouteriez la logique pour envoyer les données au serveur
  }

const next = () => {
  console.log("Données de connexion user:", formData)
  router.push("/accueil")
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
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
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motDePasse">Mot de passe</Label>
            <Input
              id="motDePasse"
              name="motDePasse"
              type="password"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="button" onClick={next} className="w-full bg-blue-600 hover:bg-blue-700">
            S&apos;inscrire
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <Link href="/connexion" className="text-amber-500 hover:underline">
            Connectez-vous
          </Link>
        </div>
      </div>
    </div>
  )
}
