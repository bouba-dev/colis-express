import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"
import { ArrowLeft } from "lucide-react"

interface UserHeaderProps {
  showBackButton?: boolean
  backUrl?: string
}

export function UserHeader({ showBackButton = false, backUrl = "/accueil" }: UserHeaderProps) {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Link href={backUrl} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
          )}
          <Link href="/accueil">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-600">Coli</span>
              <span className="text-amber-500">Express</span>
            </h1>
          </Link>
        </div>
        <div>
          <LogoutButton variant="outline" className="text-blue-600" />
        </div>
      </div>
    </header>
  )
}
