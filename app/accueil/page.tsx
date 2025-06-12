"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Package, BarChart3 } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



export default function Accueil() {
  useEffect(() => {
    AOS.init({
      duration: 3000,  // durée de l'animation en ms
      once: true,      // si tu veux que l'animation se joue qu'une seule fois
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-500 to-blue-700 text-white">
    
      <header className="bg-white text-black p-4 shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
          <LogoutButton variant="outline" className="text-blue-600" />
        </div>
      </header>

     
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">Simplifiez vos envois</h2>
        <p className="text-lg text-white/90 max-w-3xl mx-auto">
          Automatisez la gestion de vos colis grâce à notre plateforme tout-en-un.
          Créez, suivez et analysez vos envois en toute simplicité.
        </p>
      </section>

     
      <section className="flex flex-wrap justify-center gap-8 px-6">
       
        <div className="flex flex-col bg-white text-black rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 w-[350px]" data-aos="fade-right">
          <Image
            src="/font.jpg"
            alt="Ajouter un colis"
            width={600}
            height={350}
            className="object-cover w-full h-56"
          />
          <div className="p-4">
            <Link href="/ajouter-colis">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg flex justify-center items-center gap-2">
                <Package className="h-6 w-6" />
                Ajouter un colis
              </Button>
            </Link>
          </div>
        </div>

        
        <div className="flex flex-col bg-white text-black rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 w-[350px]" data-aos="fade-up">
          <Image
            src="/suivie.jpeg"
            alt="Suivre un colis"
            width={600}
            height={350}
            className="object-cover w-full h-56"
          />
          <div className="p-4">
            <Link href="/suivre-colis">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg flex justify-center items-center gap-2">
                <Eye className="h-6 w-6" />
                Suivre un colis
              </Button>
            </Link>
          </div>
        </div>


        <div className="flex flex-col bg-white text-black rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 w-[350px]" data-aos="fade-left">
          <Image
            src="/stat.jpeg"
            alt="Voir les statistiques"
            width={600}
            height={350}
            className="object-cover w-full h-56"
          />
          <div className="p-4">
            <Link href="/Statistique">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg flex justify-center items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Voir les statistiques
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
      <section className="mt-12 px-4 text-center max-w-6xl mx-auto">
        <p className="text-lg text-white/90 leading-8">
          Notre plateforme vous permet de gérer l’ensemble de vos envois de colis de manière simple,
          rapide et 100% en ligne. Grâce à notre solution automatisée, vous pouvez suivre vos livraisons,
          planifier des envois et recevoir des notifications en temps réel. Fini les longues files d’attente
          et les formulaires papier : vive la simplicité. Une seule interface intuitive pour tout gérer :
          création d’envoi, suivi en temps réel, gestion des retours, et plus encore.
        </p>
      </section>

 
      <footer className="mt-16 text-center text-white/60 text-sm pb-6">
        © 2025 ColiExpress — Tous droits réservés
      </footer>
    </div>
  );
}
