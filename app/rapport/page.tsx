"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogIn, Shield, Package } from "lucide-react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function rapports() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-black border border-white/20" data-aos="fade-up">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-amber-500 p-4">
              <Package className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
          <p className="text-gray-700 text-lg">Bienvenue sur votre plateforme de livraison</p>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Choisissez votre espace</h2>
            <p className="text-gray-600">Accédez à votre compte ou créez-en un nouveau</p>
          </div>

          <div className="space-y-4">
            <Link href="/inscription" className="block w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                <User className="mr-3 h-5 w-5" />
                S&apos;inscrire
              </Button>
            </Link>
            
            <Link href="/connexion" className="block w-full">
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                <LogIn className="mr-3 h-5 w-5" />
                Se connecter
              </Button>
            </Link>
            
            <Link href="/admin/connexionadmin" className="block w-full">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                <Shield className="mr-3 h-5 w-5" />
                Espace Administrateur
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

