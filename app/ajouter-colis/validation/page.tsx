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
    <div className="flex min-h-screen flex-col bg-blue-500">
      <header className="bg-white p-4 shadow-md">
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
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600">Validation</h2>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numeroSuivi">Numéro de suivi:</Label>
                <Input
                  id="numeroSuivi"
                  name="numeroSuivi"
                  value={formData.numeroSuivi}
                  onChange={handleChange}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="montant">Montant à payer en FCFA:</Label>
                <Input id="montant" name="montant" value={formData.montant} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statutInitial">Statut initial:</Label>
                <select
                  id="statutInitial"
                  name="statutInitial"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={formData.statutInitial}
                  onChange={handleSelectChange}
                >
                  <option value="En attente">En attente</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moyenPaiement">Moyen de paiement:</Label>
                <select
                  id="moyenPaiement"
                  name="moyenPaiement"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={formData.moyenPaiement}
                  onChange={handleSelectChange}
                >
                  <option value="Mobile money">Mobile money</option>
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="Espèces">Espèces</option>
                </select>
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
