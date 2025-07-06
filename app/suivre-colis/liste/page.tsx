"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { UserHeader } from "@/components/user-header"
import { toast } from "@/components/ui/use-toast"
import { Colis, getStatusColor, getStatusText } from "@/lib/types/colis"

export default function ListeColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [colis, setColis] = useState<Colis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

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
        // Trigger fade-in animation after loading
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchColis()
  }, [])

  const filteredColis = colis.filter(
    (item) =>
      item.numero_suivi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nom_destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresse_destinataire.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader showBackButton backUrl="/suivre-colis" />
      <main className="flex flex-1 flex-col items-center p-4">
        <div 
          className={`w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600 animate-pulse">Suivi de mes colis</h2>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Rechercher par numéro, destinataire ou adresse"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredColis.length > 0 ? (
            <div className="space-y-4">
              {filteredColis.map((item, index) => (
                <Link 
                  key={item.id} 
                  href={`/suivre-colis/detail?numero=${item.numero_suivi}`} 
                  className="block"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div 
                    className={`rounded-lg border border-gray-200 p-4 transition-all duration-500 ease-out hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02] bg-white/95 backdrop-blur-sm animate-fade-in-up ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="mb-2 font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700">
                      {item.numero_suivi}
                    </div>
                    <div className="mb-1 text-sm text-gray-700 transition-colors duration-300">
                      Destinataire: {item.nom_destinataire}
                    </div>
                    <div className="mb-1 text-sm text-gray-600 transition-colors duration-300">
                      Téléphone: {item.telephone_destinataire}
                    </div>
                    <div className="mb-1 text-sm text-gray-600 transition-colors duration-300">
                      Adresse: {item.adresse_destinataire}
                    </div>
                    <div className="mb-2 text-sm text-gray-600 transition-colors duration-300">
                      Type: {item.type_colis} • Poids: {item.poids}kg • Valeur: {item.valeur}€
                    </div>
                    <div 
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 ${getStatusColor(item.statut)}`}
                    >
                      {getStatusText(item.statut)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div 
              className={`rounded-lg border border-gray-200 p-6 text-center bg-white/95 backdrop-blur-sm transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <p className="text-gray-700 mb-4">Vous n'avez pas encore de colis.</p>
              <Link 
                href="/ajouter-colis" 
                className="mt-2 inline-block text-blue-600 hover:underline transition-all duration-300 hover:text-blue-700 hover:scale-105"
              >
                Ajouter votre premier colis
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}