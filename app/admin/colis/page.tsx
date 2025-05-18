"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, Search, Plus } from "lucide-react"

export default function GestionColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [colis, setColis] = useState([
    {
      id: "001",
      expediteur: "Mohamed Touré",
      destinataire: "Mariam Maïga",
      destination: "Tombouctou",
      agence: "Tilemsi",
      statut: "En attente",
      date: "25/04/2025",
    },
    {
      id: "002",
      expediteur: "Aly Konaté",
      destinataire: "Ami Cissé",
      destination: "Kayes",
      agence: "Nour Transport",
      statut: "En attente",
      date: "26/04/2025",
    },
    {
      id: "003",
      expediteur: "Fatoumata Lah",
      destinataire: "Oumou Keita",
      destination: "Sévaré",
      agence: "Africa Tours",
      statut: "En attente",
      date: "27/04/2025",
    },
    {
      id: "004",
      expediteur: "Aïcha Sow",
      destinataire: "Moussa Sy",
      destination: "Ségou",
      agence: "Tilemsi",
      statut: "En attente",
      date: "28/04/2025",
    },
    {
      id: "005",
      expediteur: "Ibrahim Diallo",
      destinataire: "Kadiatou Diop",
      destination: "Bamako",
      agence: "Nour Transport",
      statut: "En transit",
      date: "24/04/2025",
    },
    {
      id: "006",
      expediteur: "Seydou Coulibaly",
      destinataire: "Aminata Traoré",
      destination: "Mopti",
      agence: "Africa Tours",
      statut: "Livré",
      date: "20/04/2025",
    },
  ])

  const filteredColis = colis.filter(
    (coli) =>
      coli.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coli.expediteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coli.destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coli.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleChangeStatus = (id: string, newStatus: string) => {
    setColis(colis.map((coli) => (coli.id === id ? { ...coli, statut: newStatus } : coli)))
  }

  const handleDelete = (id: string) => {
    setColis(colis.filter((coli) => coli.id !== id))
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex w-1/2 items-center gap-2">
              <Input
                placeholder="Rechercher un colis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5" />
              </Button>
            </div>
           <Link
           href="colis/ajouter">
             <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-5 w-5" />
              Ajouter un colis
            </Button>

           </Link>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 pr-4">ID</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Expéditeur</th>
                    <th className="pb-3 pr-4">Destinataire</th>
                    <th className="pb-3 pr-4">Destination</th>
                    <th className="pb-3 pr-4">Agence</th>
                    <th className="pb-3 pr-4">Statut</th>
                    <th className="pb-3 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColis.map((coli) => (
                    <tr key={coli.id} className="border-b">
                      <td className="py-3 pr-4">{coli.id}</td>
                      <td className="py-3 pr-4">{coli.date}</td>
                      <td className="py-3 pr-4">{coli.expediteur}</td>
                      <td className="py-3 pr-4">{coli.destinataire}</td>
                      <td className="py-3 pr-4">{coli.destination}</td>
                      <td className="py-3 pr-4">{coli.agence}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-3 w-3 rounded-full ${
                              coli.statut === "En attente"
                                ? "bg-yellow-400"
                                : coli.statut === "En transit"
                                  ? "bg-blue-400"
                                  : "bg-green-400"
                            }`}
                          ></span>
                          {coli.statut}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <select
                            className="rounded border border-gray-300 px-2 py-1 text-sm"
                            value={coli.statut}
                            onChange={(e) => handleChangeStatus(coli.id, e.target.value)}
                          >
                            <option value="En attente">En attente</option>
                            <option value="En transit">En transit</option>
                            <option value="Livré">Livré</option>
                          </select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(coli.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
