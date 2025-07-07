"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, Search, Plus, Edit, Trash2 } from "lucide-react"

export default function GestionUtilisateurs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [utilisateurs, setUtilisateurs] = useState([
    {
      id: "U001",
      nom: "Mohamed Touré",
      email: "mohamed.toure@example.com",
      telephone: "+223 70 12 34 56",
      role: "Client",
      dateInscription: "15/01/2025",
    },
    {
      id: "U002",
      nom: "Fatoumata Diallo",
      email: "fatoumata.diallo@example.com",
      telephone: "+223 76 23 45 67",
      role: "Client",
      dateInscription: "22/01/2025",
    },
    {
      id: "U003",
      nom: "Amadou Sanogo",
      email: "amadou.sanogo@example.com",
      telephone: "+223 65 34 56 78",
      role: "Admin",
      dateInscription: "05/12/2024",
    },
    {
      id: "U004",
      nom: "Aïssata Traoré",
      email: "aissata.traore@example.com",
      telephone: "+223 79 45 67 89",
      role: "Client",
      dateInscription: "18/02/2025",
    },
    {
      id: "U005",
      nom: "Ibrahim Coulibaly",
      email: "ibrahim.coulibaly@example.com",
      telephone: "+223 66 56 78 90",
      role: "Admin",
      dateInscription: "10/11/2024",
    },
  ])

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const filteredUtilisateurs = utilisateurs.filter(
    (user) =>
      (user.id + "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.nom + " ").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setUtilisateurs(utilisateurs.filter((user) => user.id !== id))
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`w-64 border-r bg-white/95 backdrop-blur-sm transition-all duration-700 ease-out ${
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
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 transition-all duration-300" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/colis"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <Package className="mr-3 h-5 w-5 transition-all duration-300" />
            Gestion des colis
          </Link>
          <Link
            href="/admin/statistiques"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <BarChart2 className="mr-3 h-5 w-5 transition-all duration-300" />
            Statistiques
          </Link>
         
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600 transition-all duration-300"
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
      <div className="flex-1">
        <header className="border-b bg-white/95 backdrop-blur-sm p-4 shadow-sm">
          <h2 className={`text-2xl font-semibold text-blue-600 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            Gestion des utilisateurs
          </h2>
        </header>

        <main className="p-6">
          <div className={`mb-6 flex items-center justify-between transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '200ms' }}>
            <div className="flex w-1/2 items-center gap-2">
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95">
                <Search className="h-5 w-5 transition-all duration-300" />
              </Button>
            </div>
            <Link href="utilisateurs/ajouter">
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95">
                <Plus className="h-5 w-5 transition-all duration-300" />
                Ajouter un utilisateur
              </Button>
            </Link>
          </div>

          <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ animationDelay: '400ms' }}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left bg-gray-50">
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">ID</th>
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">Nom</th>
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">Email</th>
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">Téléphone</th>
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">Date d&apos;inscription</th>
                    <th className="pb-3 pr-4 text-gray-900 font-semibold transition-colors duration-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUtilisateurs.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b transition-all duration-500 ease-out hover:bg-blue-50 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <td className="py-3 pr-4 text-gray-900 font-medium transition-colors duration-300">{user.id}</td>
                      <td className="py-3 pr-4 text-gray-900 font-medium transition-colors duration-300">{user.nom}</td>
                      <td className="py-3 pr-4 text-gray-900 transition-colors duration-300">{user.email}</td>
                      <td className="py-3 pr-4 text-gray-900 transition-colors duration-300">{user.telephone}</td>
                      <td className="py-3 pr-4 text-gray-900 transition-colors duration-300">{user.dateInscription}</td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <Edit className="h-4 w-4 transition-all duration-300" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105 active:scale-95"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4 transition-all duration-300" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUtilisateurs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-2 text-center">Aucun utilisateur trouvé.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
