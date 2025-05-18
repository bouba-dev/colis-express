"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutDashboard, Package, BarChart2, Users, LogOut } from "lucide-react"

export default function AjouterColis() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    destinataire: "",
    telephone: "",
    destination: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Données du colis:", formData)
    // Ici, vous ajouteriez la logique pour enregistrer le colis
    router.push("/admin/colis")
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
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600"
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
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
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
          <h2 className="text-2xl font-semibold text-blue-600">Gestion des colis</h2>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium">Ajouter un colis</h3>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 md:w-2/3">
              <div className="space-y-2">
                <Label htmlFor="destinataire">Destinataire</Label>
                <Input
                  id="destinataire"
                  name="destinataire"
                  value={formData.destinataire}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
