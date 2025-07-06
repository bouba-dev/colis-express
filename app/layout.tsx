import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ColiExpress ",
  description: "Plateforme de gestion de colis en ligne",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
