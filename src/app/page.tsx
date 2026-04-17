import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
export default function Home() {
  return (
    <div
      id="employees-page"
      className="flex justify-center"
    >
      <div
        id="employees-container"
        className="flex flex-col flex-1 max-w-7xl"
      >
        <div
          id="employees-title"
          className="flex flex-col py-8 gap-1"
        >
          <h1
            id="employees-title-main"
            className="font-bold text-4xl"
          >
            Controle de Funcionários
          </h1>
          <h2
            id="employees-title-sub"
            className="font-bold text-xl"
          >
            Empresa DoQR Tecnologia
          </h2>
        </div>

        <div
          id="employees-content"
          className="flex flex-col gap-4"
        >
          <div
            id="employees-content-search"
            className="flex flex-1 flex-row justify-between items-center"
          >
            <Field
              orientation="horizontal"
              className="flex flex-1 justify-between"
            >
              <Input
                className="max-w-sm"
                placeholder="Buscar Funcionário..."
              />
              <Button>
                <Plus /> Novo Funcionário
              </Button>
            </Field>
          </div>
          <div
            id="employees-content-table"
            className="flex flex-1 flex-row justify-between items-center"
          >
            <Table>
              <TableHeader className="bg-table-title">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Celular</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Tipo de Contratação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
