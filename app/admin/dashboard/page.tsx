"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminDashboard() {
  const [colis, setColis] = useState([
    {
      id: "001",
      expediteur: "Mohamed Touré",
      destinataire: "Mariam Maïga",
      destination: "Tombouctou",
      agence: "Tilemsi",
      statut: "En attente",
    },
    {
      id: "002",
      expediteur: "Aly Konaté",
      destinataire: "Ami Cissé",
      destination: "Kayes",
      agence: "Nour Transport",
      statut: "En attente",
    },
    {
      id: "003",
      expediteur: "Fatoumata Lah",
      destinataire: "Oumou Keita",
      destination: "Sévaré",
      agence: "Africa Tours",
      statut: "En attente",
    },
    {
      id: "004",
      expediteur: "Aïcha Sow",
      destinataire: "Moussa Sy",
      destination: "Ségou",
      agence: "Tilemsi",
      statut: "En attente",
    },
  ])

  const statistiques = {
    enAttente: 25,
    enTransit: 43,
    livres: 168,
  }

  const handleConfirmer = (id: string) => {
    setColis(
      colis.map((coli) =>
        coli.id === id ? { ...coli, statut: coli.statut === "En attente" ? "En transit" : "Livré" } : coli,
      ),
    )
  }

  const handleAnnuler = (id: string) => {
    setColis(colis.filter((coli) => coli.id !== id))
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activePage="dashboard" />

      {/* Main content */}
      <div className="flex-1">
        <header className="border-b bg-white/95 backdrop-blur-sm p-4 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-600">Tableau de bord</h2>
        </header>

        <main className="p-6">
          {/* Statistics */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center rounded-lg border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
              <div className="mr-4 rounded-lg border p-3">
                <Image
                  src="/attente.png"
                  alt="En attente"
                  width={50}
                  height={50}
                  className="h-12 w-12"
                />
              </div>
              <div>
                <p className="text-sm text-gray-700">Colis en attente:</p>
                <p className="text-2xl font-bold text-gray-800">{statistiques.enAttente}</p>
              </div>
            </div>

            <div className="flex items-center rounded-lg border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
              <div className="mr-4 rounded-lg border p-3">
                <Image
                  src="/transit.png"
                  alt="En transit"
                  width={50}
                  height={50}
                  className="h-12 w-12"
                />
              </div>
              <div>
                <p className="text-sm text-gray-700">Colis en transit:</p>
                <p className="text-2xl font-bold text-gray-800">{statistiques.enTransit}</p>
              </div>
            </div>

            <div className="flex items-center rounded-lg border bg-white/95 backdrop-blur-sm p-4 shadow-sm">
              <div className="mr-4 rounded-lg border p-3">
                <Image
                  src="/12.png"
                  alt="Livrés"
                  width={50}
                  height={50}
                  className="h-12 w-12"
                />
              </div>
              <div>
                <p className="text-sm text-gray-700">Colis livrés:</p>
                <p className="text-2xl font-bold text-gray-800">{statistiques.livres}</p>
              </div>
            </div>
          </div>

          {/* Recent packages */}
          <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-gray-800">Derniers colis</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 pr-4 text-gray-700 font-medium">ID</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Expéditeurs</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Destinataires</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Destination</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Agence</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Statut</th>
                    <th className="pb-3 pr-4 text-gray-700 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colis.map((coli) => (
                    <tr key={coli.id} className="border-b">
                      <td className="py-3 pr-4 text-gray-800">{coli.id}</td>
                      <td className="py-3 pr-4 text-gray-800">{coli.expediteur}</td>
                      <td className="py-3 pr-4 text-gray-800">{coli.destinataire}</td>
                      <td className="py-3 pr-4 text-gray-800">{coli.destination}</td>
                      <td className="py-3 pr-4 text-gray-800">{coli.agence}</td>
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
                          <span className="text-gray-800">{coli.statut}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleConfirmer(coli.id)}
                          >
                            Confirmer
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleAnnuler(coli.id)}
                          >
                            Annuler
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
