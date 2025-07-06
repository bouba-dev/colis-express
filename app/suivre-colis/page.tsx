"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Colis, getStatusText } from "@/lib/types/colis"

export default function ListeColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const [colis, setColis] = useState<Colis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setAnimateItems(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

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
      item.nom_destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresse_destinataire.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className={`bg-white/95 backdrop-blur-sm p-4 shadow-md transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="mx-auto flex max-w-6xl items-center">
          <Link href="/accueil" className="mr-2 hover:scale-110 transition-transform duration-200">
            <ArrowLeft className="h-6 w-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center p-4">
        <div className={`w-full max-w-6xl rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Suivi de mes colis</h2>
            <p className="text-gray-600">Recherchez et suivez vos colis</p>
          </div>

          <div className="mb-6 flex items-center gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Input 
                placeholder="Rechercher par numéro, destinataire ou adresse" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredColis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredColis.map((item, index) => {
                const getStatusIcon = (statut: string) => {
                  switch (statut.toLowerCase()) {
                    case "livre":
                      return <CheckCircle className="h-4 w-4 text-green-600" />
                    case "en_transit":
                      return <Truck className="h-4 w-4 text-blue-600" />
                    case "en_attente":
                      return <Clock className="h-4 w-4 text-yellow-600" />
                    case "en_cours_de_traitement":
                      return <Package className="h-4 w-4 text-orange-600" />
                    case "pret_pour_expedition":
                      return <AlertCircle className="h-4 w-4 text-purple-600" />
                    default:
                      return <Package className="h-4 w-4 text-gray-600" />
                  }
                }

                return (
                  <Link 
                    key={item.id} 
                    href={`/suivre-colis/detail?numero=${item.numero_suivi}`}
                    className={`block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 bg-white/95 backdrop-blur-sm transition-all duration-500 delay-${300 + index * 100} hover:scale-105 hover:shadow-lg ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-blue-600 text-sm truncate">{item.numero_suivi}</div>
                      {getStatusIcon(item.statut)}
                    </div>
                    <div className="mb-2 text-xs text-gray-600 truncate">
                      {item.nom_destinataire}
                    </div>
                    <div className="mb-2 text-xs text-gray-500 truncate">
                      {item.adresse_destinataire}
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 ${
                        item.statut.toLowerCase() === "livre"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : item.statut.toLowerCase() === "en_transit"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : item.statut.toLowerCase() === "en_attente"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : item.statut.toLowerCase() === "en_cours_de_traitement"
                            ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                          : item.statut.toLowerCase() === "pret_pour_expedition"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      <span className="truncate">{getStatusText(item.statut)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 p-6 text-center bg-white/95 backdrop-blur-sm">
              <p className="text-gray-700">Vous n'avez pas encore de colis.</p>
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
