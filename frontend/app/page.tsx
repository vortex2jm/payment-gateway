import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Bem-vindo ao Payment Gateway</h1>
          <p className="mt-2 text-sm text-gray-600">Por favor, insira sua API Key para continuar</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <Input id="apiKey" placeholder="Digite sua API Key" type="password" />
          </div>

          <Button asChild className="w-full">
            <Link href="/dashboard">
              <span className="flex items-center justify-center gap-2">Entrar</span>
            </Link>
          </Button>

          <div className="text-center text-sm">
            <Link href="/register" className="text-gray-600 hover:underline">
              Não tem uma API Key? Crie sua conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
