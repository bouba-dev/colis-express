"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"

export default function ListeColis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [colis, setColis] = useState([
    {
      numero: "ML-24037-XYZ12345",
      statut: "Livré",
    },
    {
      numero: "ML-24037-XYZ12378",
      statut: "En transit",
    },
  ])

  const filteredColis = colis.filter((item) => item.numero.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex min-h-screen flex-col">
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

      <main className="flex flex-1 flex-col items-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600">Suivi de mes colis</h2>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <Input 
              placeholder="ML-24037-XYZ12345" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:border-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {filteredColis.map((item) => (
              <div
                key={item.numero}
                className="rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50 bg-white/95 backdrop-blur-sm"
              >
                <div className="mb-2 font-medium text-blue-600">{item.numero}</div>
                <div
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    item.statut === "Livré"
                      ? "bg-green-100 text-green-800"
                      : item.statut === "En transit"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Statut: {item.statut}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
