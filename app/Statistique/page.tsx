"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, ArrowLeft } from "lucide-react"

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
      <div className="flex-1">
        <header className="bg-white/95 backdrop-blur-sm p-4 shadow-md">
          <div className="mx-auto flex max-w-6xl items-center">
            <Link href="/accueil" className="mr-2">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-blue-600">Coli</span>
              <span className="text-amber-500">Express</span>
            </h1>
          </div>
        </header>

        <main className="p-6">
          {/* Summary */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-700">Total des colis</h3>
              <p className="text-3xl font-bold text-blue-600">{statistiques.total}</p>
            </div>
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-700">En attente</h3>
              <p className="text-3xl font-bold text-yellow-500">{statistiques.enAttente}</p>
              <p className="mt-2 text-sm text-gray-600">
                {Math.round((statistiques.enAttente / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-700">En transit</h3>
              <p className="text-3xl font-bold text-blue-500">{statistiques.enTransit}</p>
              <p className="mt-2 text-sm text-gray-600">
                {Math.round((statistiques.enTransit / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-medium text-gray-700">Livrés</h3>
              <p className="text-3xl font-bold text-green-500">{statistiques.livres}</p>
              <p className="mt-2 text-sm text-gray-600">
                {Math.round((statistiques.livres / statistiques.total) * 100)}% du total
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Agences */}
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold text-gray-800">Colis par agence</h3>
              <div className="space-y-4">
                {statistiques.agences.map((agence) => (
                  <div key={agence.nom}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-700">{agence.nom}</span>
                      <span className="font-medium text-gray-800">{agence.colis}</span>
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
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold text-gray-800">Colis par destination</h3>
              <div className="space-y-4">
                {statistiques.destinations.map((destination) => (
                  <div key={destination.nom}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-700">{destination.nom}</span>
                      <span className="font-medium text-gray-800">{destination.colis}</span>
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
