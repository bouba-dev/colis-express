import Link from "next/link"
import { LayoutDashboard, Package, BarChart2, Users, FileText } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

interface AdminSidebarProps {
  activePage: "dashboard" | "colis" | "statistiques" | "rapports" | "utilisateurs" | "tarification"
}

export function AdminSidebar({ activePage }: AdminSidebarProps) {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-600">Coli</span>
          <span className="text-amber-500">Express</span>
        </h1>
      </div>
      <nav className="mt-6">
        <Link
          href="/admin/dashboard"
          className={`flex items-center border-l-4 px-4 py-3 ${
            activePage === "dashboard"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Tableau de bord
        </Link>
        <Link
          href="/admin/colis"
          className={`flex items-center border-l-4 px-4 py-3 ${
            activePage === "colis"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Package className="mr-3 h-5 w-5" />
          Gestion des colis
        </Link>
        <Link
          href="/admin/statistiques"
          className={`flex items-center border-l-4 px-4 py-3 ${
            activePage === "statistiques"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Statistiques
        </Link>
        <Link
          href="/admin/rapports"
          className={`flex items-center border-l-4 px-4 py-3 ${
            activePage === "rapports"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <FileText className="mr-3 h-5 w-5" />
          Rapports
        </Link>
        <Link
          href="/admin/utilisateurs"
          className={`flex items-center border-l-4 px-4 py-3 ${
            activePage === "utilisateurs"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-gray-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Users className="mr-3 h-5 w-5" />
          Gestion des utilisateurs
        </Link>
      </nav>
      <div className="mt-auto p-4">
        <LogoutButton variant="outline" className="flex w-full items-center justify-center gap-2 text-red-600">
          <LogoutButton />
        </LogoutButton>
      </div>
    </div>
  )
}
