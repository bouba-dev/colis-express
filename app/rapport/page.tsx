import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function rapports() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl shadow-black">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Coli</span>
            <span className="text-amber-500">Express</span>
          </h1>
        </div>
        <div className="space-y-4">
          <Link href="/inscription" className="block w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">S&apos;inscrire</Button>
          </Link>
          <Link href="/connexion" className="block w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Se connecter</Button>
          </Link>
          <Link href="/admin/connexionadmin" className="block w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">admin</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

