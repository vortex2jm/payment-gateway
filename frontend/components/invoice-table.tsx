import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

interface Invoice {
  id: string
  description: string
  value: string
  status: string
  date: string
}

interface InvoiceTableProps {
  invoices: Invoice[]
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm font-medium text-gray-500">
            <th className="pb-3 pl-4 pr-2">ID</th>
            <th className="px-2 pb-3">Descrição</th>
            <th className="px-2 pb-3">Valor</th>
            <th className="px-2 pb-3">Status</th>
            <th className="px-2 pb-3">Data</th>
            <th className="pb-3 pl-2 pr-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b text-sm hover:bg-gray-50">
              <td className="py-4 pl-4 pr-2 font-medium">{invoice.id}</td>
              <td className="px-2 py-4">{invoice.description}</td>
              <td className="px-2 py-4">{invoice.value}</td>
              <td className="px-2 py-4">
                <StatusBadge status={invoice.status} />
              </td>
              <td className="px-2 py-4">{invoice.date}</td>
              <td className="py-4 pl-2 pr-4 text-right">
                <Link
                  href={`/dashboard/faturas/${invoice.id.replace("#", "")}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalhes</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  switch (status) {
    case "Aprovado":
      variant = "default"
      break
    case "Pendente":
      variant = "secondary"
      break
    case "Rejeitado":
      variant = "destructive"
      break
    default:
      variant = "outline"
  }

  return <Badge variant={variant}>{status}</Badge>
}
