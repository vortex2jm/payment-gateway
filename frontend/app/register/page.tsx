import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="mt-2 text-sm text-gray-600">Preencha os dados abaixo para obter sua API Key</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome completo
            </label>
            <Input id="name" placeholder="Seu nome completo" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirme sua senha
            </label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full">
            Criar conta
          </Button>

          <div className="text-center text-sm">
            <Link href="/" className="text-gray-600 hover:underline">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
