"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, BarChart2, Users, LogOut, ArrowLeft, Calendar, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

export default function Statistiques() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateNumbers, setAnimateNumbers] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      setAnimateNumbers(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Statistiques personnelles du client (exemple avec données fictives)
  const statistiquesPersonnelles = {
    totalColisEnvoyes: 12,
    colisEnAttente: 2,
    colisEnTransit: 3,
    colisLivres: 7,
    agencesUtilisees: [
      { nom: "Nour Transport", colis: 5, derniereUtilisation: "2024-01-15" },
      { nom: "Tilemsi", colis: 4, derniereUtilisation: "2024-01-10" },
      { nom: "Africa Tours", colis: 3, derniereUtilisation: "2024-01-05" },
    ],
    destinationsFrequentes: [
      { nom: "Bamako", colis: 6 },
      { nom: "Ségou", colis: 3 },
      { nom: "Kayes", colis: 2 },
      { nom: "Mopti", colis: 1 },
    ],
    activiteRecente: [
      { date: "2024-01-15", action: "Colis envoyé", destination: "Bamako", agence: "Nour Transport" },
      { date: "2024-01-12", action: "Colis livré", destination: "Ségou", agence: "Tilemsi" },
      { date: "2024-01-10", action: "Colis en transit", destination: "Kayes", agence: "Africa Tours" },
      { date: "2024-01-08", action: "Colis livré", destination: "Bamako", agence: "Nour Transport" },
    ]
  }

    return (
    <div className="flex min-h-screen">
      <div className="flex-1">
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

        <main className="p-6">
          {/* En-tête des statistiques personnelles */}
          <div className={`mb-6 p-4 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mes Statistiques</h2>
            <p className="text-gray-800 text-lg">Vue d'ensemble de vos activités de livraison</p>
          </div>

          {/* Résumé des colis */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 delay-300 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-2 text-lg font-medium text-gray-800">Total envoyés</h3>
              <p className={`text-3xl font-bold text-blue-600 transition-all duration-1000 ${animateNumbers ? 'scale-110' : 'scale-100'}`}>
                {animateNumbers ? statistiquesPersonnelles.totalColisEnvoyes : 0}
              </p>
              <p className="mt-2 text-sm text-gray-700">Depuis le début</p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 delay-400 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-2 text-lg font-medium text-gray-800">En attente</h3>
              <p className={`text-3xl font-bold text-yellow-600 transition-all duration-1000 ${animateNumbers ? 'scale-110' : 'scale-100'}`}>
                {animateNumbers ? statistiquesPersonnelles.colisEnAttente : 0}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {animateNumbers ? Math.round((statistiquesPersonnelles.colisEnAttente / statistiquesPersonnelles.totalColisEnvoyes) * 100) : 0}% de vos colis
              </p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 delay-500 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-2 text-lg font-medium text-gray-800">En transit</h3>
              <p className={`text-3xl font-bold text-blue-600 transition-all duration-1000 ${animateNumbers ? 'scale-110' : 'scale-100'}`}>
                {animateNumbers ? statistiquesPersonnelles.colisEnTransit : 0}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {animateNumbers ? Math.round((statistiquesPersonnelles.colisEnTransit / statistiquesPersonnelles.totalColisEnvoyes) * 100) : 0}% de vos colis
              </p>
            </div>
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 delay-600 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-2 text-lg font-medium text-gray-800">Livrés</h3>
              <p className={`text-3xl font-bold text-green-600 transition-all duration-1000 ${animateNumbers ? 'scale-110' : 'scale-100'}`}>
                {animateNumbers ? statistiquesPersonnelles.colisLivres : 0}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {animateNumbers ? Math.round((statistiquesPersonnelles.colisLivres / statistiquesPersonnelles.totalColisEnvoyes) * 100) : 0}% de vos colis
              </p>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Agences utilisées */}
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-1000 delay-700 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-6 text-xl font-semibold text-gray-900">Mes agences préférées</h3>
              <div className="space-y-4">
                {statistiquesPersonnelles.agencesUtilisees.map((agence, index) => (
                  <div key={agence.nom} className={`transition-all duration-500 delay-${800 + index * 100} ${animateNumbers ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-800">{agence.nom}</span>
                      <span className="font-medium text-gray-900">{agence.colis} colis</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full bg-blue-600 transition-all duration-1000 delay-${1000 + index * 200}`}
                        style={{ width: animateNumbers ? `${(agence.colis / statistiquesPersonnelles.totalColisEnvoyes) * 100}%` : '0%' }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Dernière utilisation: {agence.derniereUtilisation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinations fréquentes */}
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-1000 delay-800 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-6 text-xl font-semibold text-gray-900">Mes destinations</h3>
              <div className="space-y-4">
                {statistiquesPersonnelles.destinationsFrequentes.map((destination, index) => (
                  <div key={destination.nom} className={`transition-all duration-500 delay-${900 + index * 100} ${animateNumbers ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-gray-800">{destination.nom}</span>
                      <span className="font-medium text-gray-900">{destination.colis} colis</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full bg-amber-600 transition-all duration-1000 delay-${1100 + index * 200}`}
                        style={{ width: animateNumbers ? `${(destination.colis / statistiquesPersonnelles.totalColisEnvoyes) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="mt-8">
            <div className={`rounded-lg border bg-white/95 backdrop-blur-sm p-6 shadow-sm transition-all duration-1000 delay-900 hover:scale-105 hover:shadow-lg ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h3 className="mb-6 text-xl font-semibold text-gray-900">Activité récente</h3>
              <div className="space-y-3">
                {statistiquesPersonnelles.activiteRecente.map((activite, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 transition-all duration-500 delay-${1000 + index * 100} hover:bg-gray-100 hover:scale-105 ${animateNumbers ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{activite.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-800">{activite.action}</span>
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{activite.destination}</span>
                      <span className="text-sm text-gray-600">via {activite.agence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
