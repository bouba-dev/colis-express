"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { UserHeader } from "@/components/user-header"
import { getMesColis } from "@/app/actions/colis"
import { toast } from "@/components/ui/use-toast"

interface Colis {
  id: number
  numero_suivi: string
  statut: string
  created_at: string
  nom_destinataire: string
}

export default function ListeColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [colis, setColis] = useState<Colis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchColis() {
      try {
        const result = await getMesColis()
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
          description: "Impossible de récupérer vos colis",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchColis()
  }, [])

  const filteredColis = colis.filter(
    (item) =>
      item.numero_suivi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nom_destinataire.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-blue-500">
      <UserHeader showBackButton backUrl="/suivre-colis" />

      <main className="flex flex-1 flex-col items-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600">Suivi de mes colis</h2>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Rechercher par numéro ou destinataire"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredColis.length > 0 ? (
            <div className="space-y-4">
              {filteredColis.map((item) => (
                <Link key={item.id} href={`/suivre-colis/detail?numero=${item.numero_suivi}`} className="block">
                  <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50">
                    <div className="mb-2 font-medium text-blue-600">{item.numero_suivi}</div>
                    <div className="mb-1 text-sm text-gray-600">Destinataire: {item.nom_destinataire}</div>
                    <div
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        item.statut === "livre"
                          ? "bg-green-100 text-green-800"
                          : item.statut === "en_transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      Statut:{" "}
                      {item.statut === "en_attente"
                        ? "En attente"
                        : item.statut === "en_transit"
                          ? "En transit"
                          : "Livré"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-600">Vous n'avez pas encore de colis.</p>
              <Link href="/ajouter-colis" className="mt-2 inline-block text-blue-600 hover:underline">
                Ajouter votre premier colis
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
