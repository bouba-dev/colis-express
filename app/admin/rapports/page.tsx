"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, FileText } from "lucide-react"

export default function Rapports() {
  const [dateDebut, setDateDebut] = useState("")
  const [dateFin, setDateFin] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const performanceData = [
    {
      agence: "Daou Transport",
      nombreColis: 35,
      montant: "250000",
      statut: "Faible",
    },
    {
      agence: "Nour Transport",
      nombreColis: 86,
      montant: "580000",
      statut: "Élevé",
    },
    {
      agence: "Air Faleme",
      nombreColis: 57,
      montant: "430000",
      statut: "Moyen",
    },
    {
      agence: "Bani Transport",
      nombreColis: 28,
      montant: "180000",
      statut: "Faible",
    },
  ]

  const handleGenererRapport = () => {
    console.log("Générer rapport pour la période:", { dateDebut, dateFin })
    // Ici, vous ajouteriez la logique pour générer le rapport
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
            href="/admin/rapports"
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600 transition-all duration-300"
          >
            <FileText className="mr-3 h-5 w-5 transition-all duration-300" />
            Rapports
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
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
            Rapports et suivi des transactions
          </h2>
        </header>

        <main className="p-6">
          <div className={`mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '200ms' }}>
            <h3 className="mb-4 text-xl font-medium text-blue-600 transition-all duration-300 hover:text-blue-700">
              Statistiques
            </h3>

            <div className={`mb-6 flex items-center gap-4 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2">
                <label htmlFor="dateDebut" className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600">
                  Date de début:
                </label>
                <input
                  type="date"
                  id="dateDebut"
                  className="rounded-md border border-gray-300 p-2 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-blue-500 focus:outline-none"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="dateFin" className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600">
                  Date de fin:
                </label>
                <input
                  type="date"
                  id="dateFin"
                  className="rounded-md border border-gray-300 p-2 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:shadow-md focus:shadow-lg focus:border-blue-500 focus:outline-none"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
              </div>
            </div>

            <div className={`overflow-x-auto rounded-lg border bg-white shadow-sm transition-all duration-700 ease-out hover:shadow-lg ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ animationDelay: '600ms' }}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left text-gray-700 font-semibold transition-colors duration-300">Agences</th>
                    <th className="p-3 text-left text-gray-700 font-semibold transition-colors duration-300">Nombres de colis</th>
                    <th className="p-3 text-left text-gray-700 font-semibold transition-colors duration-300">Montant</th>
                    <th className="p-3 text-left text-gray-700 font-semibold transition-colors duration-300">Statut de performance</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b transition-all duration-500 ease-out hover:bg-blue-50 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      <td className="p-3 text-gray-900 font-medium transition-colors duration-300">{item.agence}</td>
                      <td className="p-3 text-gray-900 font-medium transition-colors duration-300">{item.nombreColis}</td>
                      <td className="p-3 text-gray-900 font-medium transition-colors duration-300">{item.montant} FCFA</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            item.statut === "Élevé"
                              ? "bg-green-100 text-green-800"
                              : item.statut === "Moyen"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ animationDelay: '1200ms' }}>
              <Button
                onClick={handleGenererRapport}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={!dateDebut || !dateFin}
              >
                Générer le rapport
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
