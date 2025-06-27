"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Package, BarChart3 } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { ActionCard } from "@/components/ActionCard";
import Head from "next/head";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Accueil() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      <Head>
        <title>ColiExpress - Simplifiez vos envois de colis</title>
        <meta name="description" content="Automatisez la gestion de vos colis grâce à notre plateforme tout-en-un. Créez, suivez et analysez vos envois en toute simplicité." />
      </Head>
      <div className="relative min-h-screen">
        {/* Image d'arrière-plan */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/shipping-shipping-8898189_1280.jpg"
            alt="Arrière-plan ColiExpress"
            fill
            className="object-cover brightness-75"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 flex min-h-screen flex-col text-white">
          <header className="bg-white/95 backdrop-blur-sm text-black p-4 shadow-lg sticky top-0 z-50">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <h1 className="text-3xl font-bold hover:scale-105 transition-transform">
                <span className="text-blue-600">Coli</span>
                <span className="text-amber-500">Express</span>
              </h1>
              <LogoutButton variant="outline" className="text-blue-600 hover:bg-blue-50 transition-colors" />
            </div>
          </header>

          <main className="flex-grow">
            <section className="py-20 px-6 text-center max-w-5xl mx-auto" data-aos="fade-up">
              <h2 className="text-6xl font-extrabold mb-8 text-white">
                Simplifiez vos envois
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Automatisez la gestion de vos colis grâce à notre plateforme tout-en-un.
                Créez, suivez et analysez vos envois en toute simplicité.
              </p>
            </section>

            <section 
              className="flex flex-wrap justify-center gap-8 px-6 py-12" 
              aria-label="Actions principales"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <ActionCard
                imageSrc="/font.jpg"
                imageAlt="Ajouter un colis sur la plateforme ColiExpress"
                imagePriority={true}
                buttonText="Ajouter un colis"
                buttonIcon={<Package className="h-6 w-6" />}
                href="/ajouter-colis"
                aosEffect="fade-right"
              />
              <ActionCard
                imageSrc="/suivie.jpeg"
                imageAlt="Suivre un colis sur la plateforme ColiExpress"
                buttonText="Suivre un colis"
                buttonIcon={<Eye className="h-6 w-6" />}
                href="/suivre-colis"
                aosEffect="fade-up"
              />
              <ActionCard
                imageSrc="/stat.jpeg"
                imageAlt="Voir les statistiques d'envoi de colis sur ColiExpress"
                buttonText="Voir les statistiques"
                buttonIcon={<BarChart3 className="h-6 w-6" />}
                href="/Statistique"
                aosEffect="fade-left"
              />
            </section>

            <section 
              className="mt-16 px-4 text-center max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p className="text-lg text-white/90 leading-8">
                Notre plateforme vous permet de gérer l'ensemble de vos envois de colis de manière simple,
                rapide et 100% en ligne. Grâce à notre solution automatisée, vous pouvez suivre vos livraisons,
                planifier des envois et recevoir des notifications en temps réel. Fini les longues files d'attente
                et les formulaires papier : vive la simplicité. Une seule interface intuitive pour tout gérer :
                création d'envoi, suivi en temps réel, gestion des retours, et plus encore.
              </p>
            </section>
          </main>

          <footer className="mt-20 text-center text-white/60 text-sm pb-6">
            <div className="max-w-6xl mx-auto px-4">
              <div className="border-t border-white/10 pt-6">
                © 2025 ColiExpress — Tous droits réservés
              </div>
            </div>
          </footer>
        </div>
 
      </div>
    </>


)}
