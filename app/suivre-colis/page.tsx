"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react"

export default function ListeColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setAnimateItems(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const [colis, setColis] = useState([
    {
      numero: "ML-24037-XYZ12345",
      statut: "Livré",
    },
    {
      numero: "ML-24037-XYZ12378",
      statut: "En transit",
    },
    {
      numero: "ML-24037-ABC98765",
      statut: "En attente",
    },
    {
      numero: "ML-24037-DEF45678",
      statut: "Livré",
    },
    {
      numero: "ML-24037-GHI78901",
      statut: "En cours de traitement",
    },
    {
      numero: "ML-24037-JKL23456",
      statut: "Prêt pour l'expédition",
    },
    {
      numero: "ML-24037-MNO34567",
      statut: "En transit",
    },
    {
      numero: "ML-24037-PQR45678",
      statut: "Livré",
    },
    {
      numero: "ML-24037-STU56789",
      statut: "En attente",
    },
    {
      numero: "ML-24037-VWX67890",
      statut: "En cours de traitement",
    },
    {
      numero: "ML-24037-YZA78901",
      statut: "Prêt pour l'expédition",
    },
    {
      numero: "ML-24037-BCD89012",
      statut: "En transit",
    },
    {
      numero: "ML-24037-EFG90123",
      statut: "Livré",
    },
    {
      numero: "ML-24037-HIJ01234",
      statut: "En attente",
    },
    {
      numero: "ML-24037-KLM12345",
      statut: "En cours de traitement",
    }
  ])

  const filteredColis = colis.filter((item) => item.numero.toLowerCase().includes(searchTerm.toLowerCase()))

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
                placeholder="ML-24037-XYZ12345" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredColis.map((item, index) => {
              const getStatusIcon = (statut: string) => {
                switch (statut) {
                  case "Livré":
                    return <CheckCircle className="h-4 w-4 text-green-600" />
                  case "En transit":
                    return <Truck className="h-4 w-4 text-blue-600" />
                  case "En attente":
                    return <Clock className="h-4 w-4 text-yellow-600" />
                  case "En cours de traitement":
                    return <Package className="h-4 w-4 text-orange-600" />
                  case "Prêt pour l'expédition":
                    return <AlertCircle className="h-4 w-4 text-purple-600" />
                  default:
                    return <Package className="h-4 w-4 text-gray-600" />
                }
              }

              return (
                <div
                  key={item.numero}
                  className={`rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 bg-white/95 backdrop-blur-sm transition-all duration-500 delay-${300 + index * 100} hover:scale-105 hover:shadow-lg ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-blue-600 text-sm truncate">{item.numero}</div>
                    {getStatusIcon(item.statut)}
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 hover:scale-105 ${
                      item.statut === "Livré"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : item.statut === "En transit"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        : item.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : item.statut === "En cours de traitement"
                          ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        : item.statut === "Prêt pour l'expédition"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <span className="truncate">{item.statut}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
