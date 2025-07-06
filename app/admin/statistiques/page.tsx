"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut } from "lucide-react"

export default function Statistiques() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

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
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600 transition-all duration-300"
          >
            <BarChart2 className="mr-3 h-5 w-5 transition-all duration-300" />
            Statistiques
          </Link>
         
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
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
            Statistiques
          </h2>
        </header>

        <main className="p-6">
          {/* Summary */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '100ms' }}>
              <h3 className="mb-2 text-lg font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600">
                Total des colis
              </h3>
              <p className="text-3xl font-bold text-blue-600 transition-all duration-300 hover:scale-110">
                {statistiques.total}
              </p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '200ms' }}>
              <h3 className="mb-2 text-lg font-medium text-gray-700 transition-colors duration-300 hover:text-yellow-600">
                En attente
              </h3>
              <p className="text-3xl font-bold text-yellow-500 transition-all duration-300 hover:scale-110">
                {statistiques.enAttente}
              </p>
              <p className="mt-2 text-sm text-gray-600 transition-colors duration-300">
                {Math.round((statistiques.enAttente / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '300ms' }}>
              <h3 className="mb-2 text-lg font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600">
                En transit
              </h3>
              <p className="text-3xl font-bold text-blue-500 transition-all duration-300 hover:scale-110">
                {statistiques.enTransit}
              </p>
              <p className="mt-2 text-sm text-gray-600 transition-colors duration-300">
                {Math.round((statistiques.enTransit / statistiques.total) * 100)}% du total
              </p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '400ms' }}>
              <h3 className="mb-2 text-lg font-medium text-gray-700 transition-colors duration-300 hover:text-green-600">
                Livrés
              </h3>
              <p className="text-3xl font-bold text-green-500 transition-all duration-300 hover:scale-110">
                {statistiques.livres}
              </p>
              <p className="mt-2 text-sm text-gray-600 transition-colors duration-300">
                {Math.round((statistiques.livres / statistiques.total) * 100)}% du total
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Agences */}
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ animationDelay: '500ms' }}>
              <h3 className="mb-6 text-xl font-semibold text-gray-800 transition-all duration-300 hover:text-blue-600">
                Colis par agence
              </h3>
              <div className="space-y-4">
                {statistiques.agences.map((agence, index) => (
                  <div 
                    key={agence.nom}
                    className={`transition-all duration-700 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-800 transition-colors duration-300 hover:text-blue-600">
                        {agence.nom}
                      </span>
                      <span className="font-medium text-gray-800 transition-all duration-300 hover:scale-110">
                        {agence.colis}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 transition-all duration-300">
                      <div
                        className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${(agence.colis / statistiques.total) * 100}%` : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-lg ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ animationDelay: '700ms' }}>
              <h3 className="mb-6 text-xl font-semibold text-gray-800 transition-all duration-300 hover:text-amber-600">
                Colis par destination
              </h3>
              <div className="space-y-4">
                {statistiques.destinations.map((destination, index) => (
                  <div 
                    key={destination.nom}
                    className={`transition-all duration-700 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-800 transition-colors duration-300 hover:text-amber-600">
                        {destination.nom}
                      </span>
                      <span className="font-medium text-gray-800 transition-all duration-300 hover:scale-110">
                        {destination.colis}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 transition-all duration-300">
                      <div
                        className="h-full bg-amber-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${(destination.colis / statistiques.total) * 100}%` : '0%'
                        }}
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
