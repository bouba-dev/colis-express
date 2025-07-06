"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutDashboard, Package, BarChart2, Users, LogOut } from "lucide-react"

export default function AjouterUtilisateur() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    contact: "",
    role: "Client",
  })

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

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
    console.log("Données utilisateur:", formData)
 
    router.push("/admin/utilisateurs")
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`w-64 border-r bg-white transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold transition-all duration-300 hover:scale-105">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 transition-all duration-300" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/colis"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <Package className="mr-3 h-5 w-5 transition-all duration-300" />
            Gestion des colis
          </Link>
          <Link
            href="/admin/statistiques"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <BarChart2 className="mr-3 h-5 w-5 transition-all duration-300" />
            Statistiques
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <Users className="mr-3 h-5 w-5 transition-all duration-300" />
            Gestion des utilisateurs
          </Link>
        </nav>
        <div className="mt-auto p-4">
          <Link href="/">
            <Button variant="outline" className="flex w-full items-center justify-center gap-2 text-red-600 transition-all duration-300 hover:scale-105 hover:bg-red-50">
              <LogOut className="h-5 w-5 transition-all duration-300" />
              Déconnexion
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <header className="border-b bg-white p-4 shadow-sm">
          <h2 className={`text-2xl font-semibold text-blue-600 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            Gestion des utilisateurs
          </h2>
        </header>

        <main className="p-6">
          <div className={`mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-medium text-gray-800 transition-all duration-300 hover:text-blue-600">
              Ajouter un utilisateur
            </h3>
          </div>

          <div className={`rounded-lg border bg-white p-6 shadow-sm transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ animationDelay: '400ms' }}>
            <form onSubmit={handleSubmit} className="space-y-4 md:w-2/3">

              <div className="space-y-2">
                <Label htmlFor="nom" className="text-black">Prénom et nom</Label>
                <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-black">Adresse</Label>
                <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-black">Contact</Label>
                <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />

              <div className={`space-y-2 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ animationDelay: '600ms' }}>
                <Label htmlFor="nom" className="text-gray-700 font-medium transition-colors duration-300 hover:text-blue-600">
                  Prénom et nom
                </Label>
                <Input 
                  id="nom" 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange} 
                  required 
                  className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  placeholder="Entrez le prénom et nom"
                />
              </div>
              </div>

              <div className={`space-y-2 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ animationDelay: '700ms' }}>
                <Label htmlFor="adresse" className="text-gray-700 font-medium transition-colors duration-300 hover:text-blue-600">
                  Adresse
                </Label>
                <Input 
                  id="adresse" 
                  name="adresse" 
                  value={formData.adresse} 
                  onChange={handleChange} 
                  required 
                  className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  placeholder="Entrez l'adresse"
                />
              </div>

              <div className={`space-y-2 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ animationDelay: '800ms' }}>
                <Label htmlFor="contact" className="text-gray-700 font-medium transition-colors duration-300 hover:text-blue-600">
                  Contact
                </Label>
                <Input 
                  id="contact" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  required 
                  className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  placeholder="Entrez le numéro de contact"
                />

              </div>
              <div className={`pt-4 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ animationDelay: '900ms' }}>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Ajouter
                </Button>
              </div>
            </form>
          </div>

          <div className={`mt-8 rounded-lg border bg-white p-6 shadow-sm transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ animationDelay: '1000ms' }}>
            <h3 className="mb-4 text-lg font-medium text-gray-800 transition-all duration-300 hover:text-blue-600">
              Liste des utilisateurs
            </h3>

            <div className="overflow-x-auto text-black">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-left text-white">
                    <th className="p-2 transition-colors duration-300">Nom</th>
                    <th className="p-2 transition-colors duration-300">Prénom</th>
                    <th className="p-2 transition-colors duration-300">Adresse</th>
                    <th className="p-2 transition-colors duration-300">Contact</th>
                    <th className="p-2 transition-colors duration-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b transition-all duration-300 hover:bg-blue-50">
                    <td className="p-2 text-gray-900 font-medium transition-colors duration-300">Dia</td>
                    <td className="p-2 text-gray-900 font-medium transition-colors duration-300">Fousseyni</td>
                    <td className="p-2 text-gray-900 transition-colors duration-300">Bamako</td>
                    <td className="p-2 text-gray-900 transition-colors duration-300">77 56 67 66</td>
                    <td className="p-2">
                      <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b transition-all duration-300 hover:bg-blue-50">
                    <td className="p-2 text-gray-900 font-medium transition-colors duration-300">Coulibaly</td>
                    <td className="p-2 text-gray-900 font-medium transition-colors duration-300">Sadio</td>
                    <td className="p-2 text-gray-900 transition-colors duration-300">Bamako</td>
                    <td className="p-2 text-gray-900 transition-colors duration-300">84 84 45 56</td>
                    <td className="p-2">
                      <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
