"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-md">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-600">Coli</span>
          <span className="text-amber-500">Express</span>
        </h1>
        <Link href="/rapport">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Se connecter</Button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <section
          className="w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-2xl p-10 shadow-xl"
          data-aos="fade-up"
        >
          <div className="text-center mb-8 ">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Bienvenue sur <span className="text-blue-600">Coli</span>
              <span className="text-amber-500">Express</span>
            </h2>
            <p className="mt-3 text-lg text-gray-700">
              Livraison intelligente, rapide et sécurisée à travers tout le Mali.
            </p>
          </div>
          <div className="space-y-4 text-justify text-gray-700">
            <p>
              ColiExpress est une plateforme moderne qui simplifie l'envoi, le suivi et la réception de colis. Grâce à notre technologie de géolocalisation, vous suivez vos livraisons en temps réel.
            </p>
            <p>
              Que vous soyez un particulier ou une entreprise, bénéficiez d'un service rapide, fiable et soutenu par un support client dédié.
            </p>
            <p>
              Rejoignez-nous et découvrez une nouvelle façon d'expédier et recevoir vos colis avec confiance.
            </p>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 ">
          {[
            {
              title: "Suivi en temps réel",
              desc: "Visualisez la progression exacte de chaque colis depuis votre espace personnel.",
              delay: 0,
            },
            {
              title: "Support client réactif",
              desc: "Une équipe disponible pour vous assister 7j/7 par mail ou téléphone.",
              delay: 100,
            },
            {
              title: "Tarification avantageuse",
              desc: "Des prix adaptés à tous les volumes, avec des remises pour les pros.",
              delay: 200,
            },
          ].map(({ title, desc, delay }) => (
            <div
              key={title}
              className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              data-aos="fade-up"
              data-aos-delay={delay}
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/95 backdrop-blur-sm text-gray-800 text-center py-6 mt-12 border-t border-gray-200">
        <p className="text-sm mb-1">
          &copy; {new Date().getFullYear()} ColiExpress. Tous droits réservés.
        </p>
        <p>
          Contact : +223 76743770 / Email : <a href="mailto:sanghoboubacar04@gmail.com" className="underline text-blue-600">sanghoboubacar04@gmail.com</a> / 
          <a href="mailto:konibacisse20@gmail.com" className="underline text-blue-600 ml-1">konibacisse20@gmail.com</a>
        </p>
      </footer>
    </div>
  )
}
