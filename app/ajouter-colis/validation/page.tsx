"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Validation() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    numeroSuivi: "ML-24037-XYZ12345",
    montant: "5000",
    statutInitial: "En attente",
    moyenPaiement: "Mobile money",
    emailSecondaire: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données de validation:", formData)
    // Ici, vous ajouteriez la logique pour enregistrer le colis
    router.push("/accueil")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white/95 backdrop-blur-sm p-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center">
          <Link href="/ajouter-colis/infos-livraison" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600">Validation</h2>
          </div>

          <div className="rounded-lg bg-white/80 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeroSuivi" className="text-gray-700 font-medium">Numéro de suivi:</Label>
                <Input
                  id="numeroSuivi"
                  name="numeroSuivi"
                  value={formData.numeroSuivi}
                  onChange={handleChange}
                  readOnly
                  className="bg-gray-100 text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="montant" className="text-gray-700 font-medium">Montant à payer en FCFA:</Label>
                <Input 
                  id="montant" 
                  name="montant" 
                  value={formData.montant} 
                  onChange={handleChange} 
                  required 
                  className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statutInitial" className="text-gray-700 font-medium">Statut initial:</Label>
                <select
                  id="statutInitial"
                  name="statutInitial"
                  className="w-full rounded-md border border-gray-300 p-2 bg-white text-gray-800"
                  value={formData.statutInitial}
                  onChange={handleSelectChange}
                  aria-label="Sélectionner le statut initial"
                >
                  <option value="En attente">En attente</option>
                  <option value="En cours de traitement">En cours de traitement</option>
                  <option value="Prêt pour l'expédition">Prêt pour l'expédition</option>
                  <option value="En transit">En transit</option>
                  <option value="En livraison">En livraison</option>
                  <option value="Livré">Livré</option>
                  <option value="Retourné">Retourné</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moyenPaiement" className="text-gray-700 font-medium">Moyen de paiement:</Label>
                <select
                  id="moyenPaiement"
                  name="moyenPaiement"
                  className="w-full rounded-md border border-gray-300 p-2 bg-white text-gray-800"
                  value={formData.moyenPaiement}
                  onChange={handleSelectChange}
                  aria-label="Sélectionner le moyen de paiement"
                >
                  <option value="Mobile money">Mobile money</option>
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="Espèces">Espèces</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailSecondaire" className="text-gray-700 font-medium">Email secondaire:</Label>
                <Input
                  id="emailSecondaire"
                  name="emailSecondaire"
                  value={formData.emailSecondaire}
                  onChange={handleChange}
                  className="bg-gray-100 text-gray-800"
                />
              </div>

              <div className="flex justify-center">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Valider
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
