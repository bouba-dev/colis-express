"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InfosLivraison() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    modeLivraison: "standard",
    date: "",
    agence: "Nour Transport",
  })

  const handleModeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, modeLivraison: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, date: e.target.value }))
  }

  const handleAgenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, agence: e.target.value }))
  }

  const handleNext = () => {
    console.log("Données de livraison:", formData)
    router.push("/ajouter-colis/validation")
  }

  const handlePrevious = () => {
    router.back()
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-500">
      <header className="bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center">
          <Link href="/ajouter-colis" className="mr-4">
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
            <h2 className="text-xl font-medium text-blue-600">Infos de livraison</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Modes de livraison:</Label>
              <RadioGroup value={formData.modeLivraison} onValueChange={handleModeChange} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date:</Label>
              <input
                type="date"
                id="date"
                className="w-full rounded-md border border-gray-300 p-2"
                value={formData.date}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agence">Agence:</Label>
              <select
                id="agence"
                className="w-full rounded-md border border-gray-300 p-2"
                value={formData.agence}
                onChange={handleAgenceChange}
              >
                <option value="Nour Transport">Nour Transport</option>
                <option value="Tilemsi">Tilemsi</option>
                <option value="Africa Tours">Africa Tours</option>
              </select>
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={handlePrevious} className="bg-amber-500 hover:bg-amber-600">
                Précédent
              </Button>
              <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
