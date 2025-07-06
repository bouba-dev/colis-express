"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DetailColis() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const numeroSuivi = searchParams.get("numero") || "ML-24037-XYZ12345"

  const [colis, setColis] = useState<{
    numero: string
    statut: string
    dateEnvoi: string
    destination: string
    estimatedDelivery: string
  } | null>(null)

  useEffect(() => {
    // Simuler une recherche basée sur le numéro de suivi
    setColis({
      numero: numeroSuivi,
      statut: numeroSuivi.endsWith("5") ? "Livré" : "En transit",
      dateEnvoi: "28/04/2025",
      destination: "Bamako, Mali",
      estimatedDelivery: "30/04/2025",
    })
  }, [numeroSuivi])

  if (!colis) {
    return <div>Chargement...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white/95 backdrop-blur-sm p-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center">
          <Link href="/suivre-colis" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-blue-600" />
          </Link>
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center p-4 pt-8">
        <div className="w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-blue-600">Suivi de mes colis</h2>
          </div>

          <div className="mb-6 rounded-lg bg-blue-600 p-4 text-white">
            <div className="mb-2 text-lg font-medium">{colis.numero}</div>
            <div className="rounded-full bg-white px-3 py-1 text-center text-sm font-medium text-blue-600">
              Statut: {colis.statut}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 bg-white/95 backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Numéro de colis:</span>
                <span className="font-medium text-gray-800">{colis.numero}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Statut:</span>
                <span className={`font-medium ${colis.statut === "Livré" ? "text-green-600" : "text-blue-600"}`}>
                  {colis.statut}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Date d&apos;envoi:</span>
                <span className="font-medium text-gray-800">{colis.dateEnvoi}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Destination:</span>
                <span className="font-medium text-gray-800">{colis.destination}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Livraison estimée:</span>
                <span className="font-medium text-gray-800">{colis.estimatedDelivery}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">Progression</span>
                <span className="text-gray-800">{colis.statut === "Livré" ? "100%" : "75%"}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-green-500" style={{ width: colis.statut === "Livré" ? "100%" : "75%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
