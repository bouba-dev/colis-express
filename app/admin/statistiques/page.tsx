"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut } from "lucide-react"

export default function Statistiques() {
  const statistiques = {
    enAttente: 25,
    enTransit: 43,
    livres: 168,
    total: 236,
    agences: [
      { nom: "Nour Transport", colis: 98 },
      { nom: "Tilemsi", colis: 76 },
      { nom: "Africa Tours", colis: 62 },
    ],
    destinations: [
      { nom: "Bamako", colis: 85 },
      { nom: "Ségou", colis: 45 },
      { nom: "Kayes", colis: 38 },
      { nom: "Tombouctou", colis: 32 },
      { nom: "Mopti", colis: 24 },
      { nom: "Autres", colis: 12 },
    ],
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
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600"
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
          <h2 className="text-2xl font-semibold text-blue-600">Statistiques</h2>
        </header>

        <main className="p-6">
          {/* Summary */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-500">Total des colis</h3>
              <p className="text-3xl font-bold text-blue-600">{statistiques.total}</p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-500">En attente</h3>
              <p className="text-3xl font-bold text-yellow-500">{statistiques.enAttente}</p>
              <p className="mt-2 text-sm text-gray-500">
                {Math.round((statistiques.enAttente / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-500">En transit</h3>
              <p className="text-3xl font-bold text-blue-500">{statistiques.enTransit}</p>
              <p className="mt-2 text-sm text-gray-500">
                {Math.round((statistiques.enTransit / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-500">Livrés</h3>
              <p className="text-3xl font-bold text-green-500">{statistiques.livres}</p>
              <p className="mt-2 text-sm text-gray-500">
                {Math.round((statistiques.livres / statistiques.total) * 100)}% du total
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Agences */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Colis par agence</h3>
              <div className="space-y-4">
                {statistiques.agences.map((agence) => (
                  <div key={agence.nom}>
                    <div className="mb-1 flex justify-between">
                      <span>{agence.nom}</span>
                      <span className="font-medium">{agence.colis}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(agence.colis / statistiques.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Colis par destination</h3>
              <div className="space-y-4">
                {statistiques.destinations.map((destination) => (
                  <div key={destination.nom}>
                    <div className="mb-1 flex justify-between">
                      <span>{destination.nom}</span>
                      <span className="font-medium">{destination.colis}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: `${(destination.colis / statistiques.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
