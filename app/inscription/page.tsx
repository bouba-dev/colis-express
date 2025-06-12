"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

import { signIn } from "next-auth/react"
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

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/accueil" })
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
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-xs">ou</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <Button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 bg-white border text-gray-700 hover:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
              <g>
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/>
                <path fill="#FBBC05" d="M24 44c5.4 0 10.1-1.8 13.5-4.9l-6.2-5.1C29.7 36 26.1 37.5 24 37.5c-5.7 0-10.5-3.8-12.2-9.1l-7 5.4C7.9 40.2 15.3 44 24 44z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-5.7 0-10.5-3.8-12.2-9.1l-7 5.4C7.9 40.2 15.3 44 24 44c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
              </g>
            </svg>
            S&apos;inscrire avec Google
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
