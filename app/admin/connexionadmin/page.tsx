"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setCookie } from "cookies-next"

export default function ConnexionAdmin() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    motDePasse: "",
  })

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/utilisateur/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomUtilisateur: formData.nomUtilisateur,
          motDePasse: formData.motDePasse,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || "Erreur lors de la connexion")
        return
      }

      if (data.user?.role !== "admin") {
        alert("Accès refusé : vous n'êtes pas administrateur.")
        return
      }

      setCookie("auth", "authenticated", { maxAge: 60 * 60 * 24 })
      setCookie("admin_auth", "admin_authenticated", { maxAge: 60 * 60 * 24 })

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Erreur de connexion :", error)
      alert("Erreur serveur, veuillez réessayer plus tard.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-2xl shadow-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className={`mb-8 text-center transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '200ms' }}>
          <h1 className="text-3xl font-bold transition-all duration-300 hover:scale-105">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`space-y-2 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '400ms' }}>
            <Label htmlFor="nomUtilisateur" className="text-gray-700 font-medium transition-colors duration-300 hover:text-blue-600">
              Nom d&apos;utilisateur:
            </Label>
            <Input
              id="nomUtilisateur"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              required
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div className={`space-y-2 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '600ms' }}>
            <Label htmlFor="motDePasse" className="text-gray-700 font-medium transition-colors duration-300 hover:text-blue-600">
              Mot de passe:
            </Label>
            <Input
              id="motDePasse"
              name="motDePasse"
              type="text"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '800ms' }}>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Se connecter
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
