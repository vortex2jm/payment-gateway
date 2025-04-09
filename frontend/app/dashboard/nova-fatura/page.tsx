import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewInvoicePage() {
  // Gerar meses para o select
  const months = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ]

  // Gerar anos para o select (atual + 10 anos)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i),
  }))

  return (
    <div className="container py-8">
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Nova Fatura
          </Link>
        </div>

        <div className="p-6">
          <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Informações da Fatura */}
            <div>
              <h2 className="mb-4 text-lg font-medium">Informações da Fatura</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="value" className="text-sm font-medium">
                    Valor (R$)*
                  </label>
                  <Input id="value" placeholder="0,00" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição*
                  </label>
                  <Textarea id="description" placeholder="Descreva o propósito desta fatura" rows={4} />
                </div>
              </div>
            </div>

            {/* Informações do Cartão */}
            <div>
              <h2 className="mb-4 text-lg font-medium">Informações do Cartão</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Número do Cartão*
                  </label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryMonth" className="text-sm font-medium">
                      Mês de Validade*
                    </label>
                    <Select>
                      <SelectTrigger id="expiryMonth">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="expiryYear" className="text-sm font-medium">
                      Ano de Validade*
                    </label>
                    <Select>
                      <SelectTrigger id="expiryYear">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cardholderName" className="text-sm font-medium">
                    Nome do Titular*
                  </label>
                  <Input id="cardholderName" placeholder="Nome como aparece no cartão" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="cvv" className="text-sm font-medium">
                    CVV*
                  </label>
                  <Input id="cvv" placeholder="•••" maxLength={4} className="max-w-[120px]" />
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="col-span-1 mt-4 flex justify-end gap-4 md:col-span-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancelar</Link>
              </Button>
              <Button type="submit">Criar Fatura</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
