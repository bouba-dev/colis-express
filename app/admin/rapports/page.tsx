"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, FileText } from "lucide-react"

export default function Rapports() {
  const [dateDebut, setDateDebut] = useState("")
  const [dateFin, setDateFin] = useState("")

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
            href="/admin/rapports"
            className="flex items-center border-l-4 border-blue-600 bg-blue-50 px-4 py-3 text-blue-600"
          >
            <FileText className="mr-3 h-5 w-5" />
            Rapports
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
          <h2 className="text-2xl font-semibold text-blue-600">Rapports et suivi des transactions</h2>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-medium text-blue-600">Statistiques</h3>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="dateDebut" className="text-sm font-medium">
                  Date de début:
                </label>
                <input
                  type="date"
                  id="dateDebut"
                  className="rounded-md border border-gray-300 p-2"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="dateFin" className="text-sm font-medium">
                  Date de fin:
                </label>
                <input
                  type="date"
                  id="dateFin"
                  className="rounded-md border border-gray-300 p-2"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left">Agences</th>
                    <th className="p-3 text-left">Nombres de colis</th>
                    <th className="p-3 text-left">Montant</th>
                    <th className="p-3 text-left">Statut de performance</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{item.agence}</td>
                      <td className="p-3">{item.nombreColis}</td>
                      <td className="p-3">{item.montant} FCFA</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
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

            <div className="mt-6">
              <Button
                onClick={handleGenererRapport}
                className="w-full bg-blue-600 hover:bg-blue-700"
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
