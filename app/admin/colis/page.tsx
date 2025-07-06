"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, Search, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Colis, getStatusText } from "@/lib/types/colis"

export default function GestionColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [colis, setColis] = useState<Colis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchColis() {
      try {
        const response = await fetch("/api/colis")
        const result = await response.json()
        if (result.error) {
          toast({
            title: "Erreur",
            description: result.error,
            variant: "destructive",
          })
        } else if (result.colis) {
          setColis(result.colis)
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les colis",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchColis()
  }, [])

  const filteredColis = colis.filter(
    (coli) =>
      coli.numero_suivi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coli.nom_destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coli.adresse_destinataire.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleChangeStatus = (id: number, newStatus: string) => {
    setColis(colis.map((coli) => (coli.id === id ? { ...coli, statut: newStatus } : coli)))
    // Ici, vous ajouteriez la logique pour mettre à jour le statut en base de données
    toast({
      title: "Statut mis à jour",
      description: `Le statut du colis ${id} a été mis à jour`,
    })
  }

  const handleDelete = (id: number) => {
    setColis(colis.filter((coli) => coli.id !== id))
    // Ici, vous ajouteriez la logique pour supprimer le colis en base de données
    toast({
      title: "Colis supprimé",
      description: `Le colis ${id} a été supprimé`,
    })
  }

  const getStatusColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case "livre":
        return "bg-green-400"
      case "en_transit":
        return "bg-blue-400"
      case "en_attente":
        return "bg-yellow-400"
      case "en_cours_de_traitement":
        return "bg-orange-400"
      case "pret_pour_expedition":
        return "bg-purple-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white/95 backdrop-blur-sm">
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
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
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Statistiques
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="flex items-center border-l-4 border-transparent px-4 py-3 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
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
      <div className="flex-1">
        <header className="border-b bg-white/95 backdrop-blur-sm p-4 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-600">Gestion des colis</h2>
        </header>

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex w-1/2 items-center gap-2">
              <Input
                placeholder="Rechercher un colis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-800 placeholder-gray-500"
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

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Numéro</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Date d'envoi</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Destinataire</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Adresse</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Type</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Poids</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Montant</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Statut</th>
                      <th className="pb-3 pr-4 text-gray-700 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColis.map((coli) => (
                      <tr key={coli.id} className="border-b">
                        <td className="py-3 pr-4 text-gray-800 font-medium">{coli.numero_suivi}</td>
                        <td className="py-3 pr-4 text-gray-800">{new Date(coli.date_envoi).toLocaleDateString('fr-FR')}</td>
                        <td className="py-3 pr-4 text-gray-800">{coli.nom_destinataire}</td>
                        <td className="py-3 pr-4 text-gray-800 text-sm">{coli.adresse_destinataire}</td>
                        <td className="py-3 pr-4 text-gray-800">{coli.type_colis}</td>
                        <td className="py-3 pr-4 text-gray-800">{coli.poids}kg</td>
                        <td className="py-3 pr-4 text-gray-800">{coli.montant}€</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-3 w-3 rounded-full ${getStatusColor(coli.statut)}`}
                            ></span>
                            <span className="text-gray-800">{getStatusText(coli.statut)}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex gap-2">
                            <select
                              className="rounded border border-gray-300 px-2 py-1 text-sm bg-white text-gray-800"
                              value={coli.statut}
                              onChange={(e) => handleChangeStatus(coli.id, e.target.value)}
                              aria-label={`Changer le statut du colis ${coli.numero_suivi}`}
                            >
                              <option value="en_attente">En attente</option>
                              <option value="en_cours_de_traitement">En cours de traitement</option>
                              <option value="pret_pour_expedition">Prêt pour l'expédition</option>
                              <option value="en_transit">En transit</option>
                              <option value="livre">Livré</option>
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
          )}
        </main>
      </div>
    </div>
  )
}
