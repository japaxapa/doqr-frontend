import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { employee } from "@/types/employee";
import { ClipboardEdit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const data = await fetch("https://api-testefrontend.qforms.com.br/employees");
  const employees = (await data.json()) as employee[];

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
                <Link
                  href={`edit/new`}
                  className="flex justify-center items-center gap-2"
                >
                  <Plus /> Novo Funcionário
                </Link>
              </Button>
            </Field>
          </div>
          <div
            id="employees-content-table"
            className="flex rounded-lg border overflow-hidden"
          >
            <Table>
              <TableHeader className="bg-table-title">
                <TableRow>
                  <TableHead className="font-bold">Nome</TableHead>
                  <TableHead className="font-bold">E-mail</TableHead>
                  <TableHead className="font-bold">CPF</TableHead>
                  <TableHead className="font-bold">Celular</TableHead>
                  <TableHead className="font-bold">
                    Data de Nascimento
                  </TableHead>
                  <TableHead className="font-bold">
                    Tipo de Contratação
                  </TableHead>
                  <TableHead className="font-bold text-center">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.cpf}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.dateOfBith}</TableCell>
                    <TableCell>{employee.typeOfHiring}</TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        {employee.status ? (
                          <Badge className="bg-green-300 text-black font-bold">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge className="bg-red-300 text-black font-bold">
                            Inativo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <Button variant="ghost">
                          <Link href={`edit/${employee.id}`}>
                            <ClipboardEdit />
                          </Link>
                        </Button>
                        <Button variant="ghost">
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
