import { Button } from "@/components/ui/button"
import Link from "next/link"
import { InvoiceTable } from "@/components/invoice-table"

export default function DashboardPage() {
  // Dados de exemplo para a tabela de faturas
  const invoices = [
    {
      id: "#123456",
      description: "Pagamento Mensal",
      value: "R$ 1.500,00",
      status: "Aprovado",
      date: "30/03/2025",
    },
    {
      id: "#123457",
      description: "Compra Online",
      value: "R$ 12.000,00",
      status: "Pendente",
      date: "29/03/2025",
    },
    {
      id: "#123458",
      description: "Serviço Prestado",
      value: "R$ 800,00",
      status: "Rejeitado",
      date: "28/03/2025",
    },
  ]

  return (
    <div className="container py-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Faturas</h1>
          <Button asChild>
            <Link href="/dashboard/nova-fatura">
              <span className="flex items-center gap-2">Nova Fatura</span>
            </Link>
          </Button>
        </div>

        <InvoiceTable invoices={invoices} />

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">Mostrando 1-3 de 3 resultados</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <span className="sr-only">Página anterior</span>
              <span aria-hidden="true">‹</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="icon" disabled>
              <span className="sr-only">Próxima página</span>
              <span aria-hidden="true">›</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
