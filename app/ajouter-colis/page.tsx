"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ChevronDown, Upload, X } from "lucide-react"
import Link from "next/link"

export default function AjouterColis() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
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
    typeColis: "",
    poids: "",
    valeur: "",
    photo: null,
  })

  const suggestions = [
    "Télévision",
    "Ordinateur",
    "Téléphone",
    "Tablette",
    "Vêtements",
    "Chaussures",
    "Livres",
    "Documents",
    "Produits alimentaires",
    "Médicaments",
    "Jouets",
    "Outils",
    "Autre"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "typeColis") {
      setShowSuggestions(true)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, typeColis: suggestion }))
    setShowSuggestions(false)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Fichier sélectionné:", file.name, file.size, file.type)
      
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert("Veuillez sélectionner une image valide")
        return
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image est trop volumineuse. Taille maximale : 5MB")
        return
      }

      // Créer une prévisualisation
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      setFormData((prev) => ({ ...prev, photo: file }))
    }
  }

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }))
    setPhotoPreview(null)
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
    <div className="flex min-h-screen flex-col">
      <header className="bg-white/95 backdrop-blur-sm p-4 shadow-md">
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
        <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg">
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
                  <Label htmlFor="nomDestinataire" className="text-gray-700 font-medium">Nom et prénom:</Label>
                  <Input
                    id="nomDestinataire"
                    name="nomDestinataire"
                    value={formData.nomDestinataire}
                    onChange={handleChange}
                    required
                    className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                    placeholder="Entrez le nom complet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-gray-700 font-medium">Numéro de téléphone:</Label>
                  <Input 
                    id="telephone" 
                    name="telephone" 
                    value={formData.telephone} 
                    onChange={handleChange} 
                    required 
                    className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                    placeholder="Ex: +225 0123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse" className="text-gray-700 font-medium">Adresse:</Label>
                  <Input 
                    id="adresse" 
                    name="adresse" 
                    value={formData.adresse} 
                    onChange={handleChange} 
                    required 
                    className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                    placeholder="Adresse complète du destinataire"
                  />
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
                  <Label htmlFor="typeColis" className="text-gray-700 font-medium">Type de colis</Label>
                  <div className="relative">
                    <Input
                      id="typeColis"
                      name="typeColis"
                      value={formData.typeColis}
                      onChange={handleChange}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      required
                      className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 pr-10"
                      placeholder="Tapez ou sélectionnez un type..."
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    
                    {showSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {suggestions
                          .filter(suggestion => 
                            suggestion.toLowerCase().includes(formData.typeColis.toLowerCase())
                          )
                          .map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-gray-700"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poids" className="text-gray-700 font-medium">Poids en kg</Label>
                  <Input
                    id="poids"
                    name="poids"
                    type="number"
                    value={formData.poids}
                    onChange={handleChange}
                    required
                    className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                    placeholder="Ex: 2.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valeur" className="text-gray-700 font-medium">Valeur déclarée en FCFA</Label>
                  <Input
                    id="valeur"
                    name="valeur"
                    type="number"
                    value={formData.valeur}
                    onChange={handleChange}
                    required
                    className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
                    placeholder="Ex: 50000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-gray-700 font-medium">Photo du colis</Label>
                  <div className="relative">
                    {photoPreview ? (
                      <div className="relative">
                        <img 
                          src={photoPreview} 
                          alt="Aperçu de la photo" 
                          className="w-full h-32 object-cover rounded-md border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          title="Supprimer la photo"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="mt-2 text-sm text-gray-600">
                          Photo sélectionnée: {formData.photo?.name}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white hover:border-blue-400 transition-colors">
                        <label htmlFor="photo-upload" className="cursor-pointer text-center text-gray-500 hover:text-blue-600">
                          <Upload className="mx-auto h-8 w-8 mb-2" />
                          <span className="block text-sm">Cliquez pour ajouter une photo</span>
                          <span className="block text-xs text-gray-400 mt-1">JPG, PNG, GIF (max 5MB)</span>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                    )}
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
