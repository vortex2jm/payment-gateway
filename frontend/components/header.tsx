import Link from "next/link"
import { LogOut, Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Menu className="h-5 w-5" />
          <Link href="/dashboard" className="font-medium">
            Payment Gateway
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Olá, usuário</span>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </div>
    </header>
  )
}
