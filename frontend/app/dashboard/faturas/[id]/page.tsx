import { ArrowLeft, Circle } from "lucide-react"
import Link from "next/link"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  // Simulando dados da fatura
  const invoice = {
    id: `#${params.id}`,
    description: "Pagamento Mensal",
    value: "R$ 1.500,00",
    status: "Aprovado",
    creationDate: "30/03/2025 15:30:45",
    lastUpdate: "30/03/2025 15:31:00",
    payment: {
      method: "Cartão de Crédito",
      cardLastDigits: "1234",
      cardholderName: "João da Silva",
      expiryDate: "12/2025",
    },
    statusHistory: [
      {
        status: "Aprovado",
        date: "30/03/2025 15:31:00",
      },
      {
        status: "Pendente",
        date: "30/03/2025 15:30:45",
      },
    ],
  }

  return (
    <div className="container py-8">
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Detalhes da Fatura
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Informações da Fatura */}
          <div>
            <h2 className="mb-4 text-lg font-medium">Informações da Fatura</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">ID da Fatura</p>
                <p>{invoice.id}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Descrição</p>
                <p>{invoice.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Valor</p>
                <p>{invoice.value}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                  {invoice.status}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Data de Criação</p>
                <p>{invoice.creationDate}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Última Atualização</p>
                <p>{invoice.lastUpdate}</p>
              </div>
            </div>
          </div>

          {/* Informações do Pagamento */}
          <div>
            <h2 className="mb-4 text-lg font-medium">Informações do Pagamento</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Método de Pagamento</p>
                <p>{invoice.payment.method}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Últimos 4 dígitos</p>
                <p>•••• •••• •••• {invoice.payment.cardLastDigits}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Nome do Titular</p>
                <p>{invoice.payment.cardholderName}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Validade</p>
                <p>{invoice.payment.expiryDate}</p>
              </div>
            </div>

            {/* Histórico de Status */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-medium">Histórico de Status</h2>

              <div className="space-y-3">
                {invoice.statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Circle className="mt-0.5 h-4 w-4 fill-current text-gray-900" />
                    <div>
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
