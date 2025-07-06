"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutDashboard, Package, BarChart2, Users, LogOut } from "lucide-react"

export default function AjouterUtilisateur() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    contact: "",
    role: "Client",
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
    console.log("Données utilisateur:", formData)
 
    router.push("/admin/utilisateurs")
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/colis"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <Package className="mr-3 h-5 w-5" />
            Gestion des colis
          </Link>
          <Link
            href="/admin/statistiques"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Statistiques
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <Users className="mr-3 h-5 w-5" />
            Gestion des utilisateurs
          </Link>
        </nav>
        <div className="mt-auto p-4">
          <Link href="/">
            <Button variant="outline" className="flex w-full items-center justify-center gap-2 text-red-600">
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <header className="border-b bg-white p-4 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-600">Gestion des utilisateurs</h2>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium">Ajouter un utilisateur</h3>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
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
              </div>
              <div className="pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Ajouter
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Liste des utilisateurs</h3>

            <div className="overflow-x-auto text-black">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-left text-white">
                    <th className="p-2">Nom</th>
                    <th className="p-2">Prénom</th>
                    <th className="p-2">Adresse</th>
                    <th className="p-2">Contact</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Dia</td>
                    <td className="p-2">Fousseyni</td>
                    <td className="p-2">Bamako</td>
                    <td className="p-2">77 56 67 66</td>
                    <td className="p-2">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Coulibaly</td>
                    <td className="p-2">Sadio</td>
                    <td className="p-2">Bamako</td>
                    <td className="p-2">84 84 45 56</td>
                    <td className="p-2">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
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
