"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AjouterColis() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    nomDestinataire: string
    telephone: string
    adresse: string
    typeColis: string
    poids: string
    valeur: string
    photo: File | null
  }>({
    nomDestinataire: "",
    telephone: "",
    adresse: "",
    typeColis: "Télévision",
    poids: "",
    valeur: "",
    photo: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(2)
  }

  const handlePrevious = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données du colis:", formData)
    // Ici, vous ajouteriez la logique pour enregistrer le colis
    router.push("/accueil")
  }
  const handleSubmite = () => {
    console.log("Données de livraison:", formData)
    router.push("/ajouter-colis/infos-livraison")
   
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-500">
      <header className="bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center">
          <Link href="/accueil" className="mr-2 flex">
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
          {step === 1 ? (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-medium text-blue-600">Infos sur le destinataire</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="nomDestinataire">Nom et prénom:</Label>
                  <Input
                    id="nomDestinataire"
                    name="nomDestinataire"
                    value={formData.nomDestinataire}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Numéro de téléphone:</Label>
                  <Input id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse:</Label>
                  <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Suivant
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-medium text-blue-600">Infos sur le colis</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="typeColis" id="typeColis-label">Type de colis</Label>
                  <select
                    id="typeColis"
                    name="typeColis"
                    aria-labelledby="typeColis-label"
                    aria-label="Type de colis"
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={formData.typeColis}
                    onChange={(e) => setFormData((prev) => ({ ...prev, typeColis: e.target.value }))}
                  >
                    <option value="Télévision">Télévision</option>
                    <option value="Ordinateur">Ordinateur</option>
                    <option value="Téléphone">Téléphone</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poids">Poids en kg</Label>
                  <Input
                    id="poids"
                    name="poids"
                    type="number"
                    value={formData.poids}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valeur">Valeur déclarée en FCFA</Label>
                  <Input
                    id="valeur"
                    name="valeur"
                    type="number"
                    value={formData.valeur}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo du colis</Label>
                  <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-gray-300">
                    <label htmlFor="photo-upload" className="cursor-pointer text-center text-gray-500">
                      <span className="block">Cliquez pour ajouter une photo</span>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData((prev) => ({ ...prev, photo: e.target.files?.[0] || null }))
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={handlePrevious} className="bg-amber-500 hover:bg-amber-600">
                    Précédent
                  </Button>
                  <Button type="button" onClick={handleSubmite}  className="bg-blue-600 hover:bg-blue-700">
                    Suivant
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
