"use client";

import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ClipboardEdit, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FormatDateToString } from "@/utils";
import { Badge } from "../ui/badge";
import { employee } from "@/types/employee";
import { use, useEffect, useState } from "react";
import { DeleteEmployee } from "@/services/employee.service";

interface IHomeContent {
  employees: Promise<employee[]>;
}

export default function HomeContent({ employees }: IHomeContent) {
  // TODO fazer um custom hook
  const data = use(employees);

  const [displayedEmployees, setDisplayedEmployees] = useState<employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setDisplayedEmployees(data);
  }, [data]);

  useEffect(() => {
    if (!searchTerm) {
      setDisplayedEmployees(data);
    } else {
      const newArr = data.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setDisplayedEmployees(newArr);
    }
  }, [searchTerm]);

  // TODO toaster
  // TODO modal para confirmação
  function onDelete(id: number) {
    if (id) {
      DeleteEmployee(id);
    }
  }

  // TODO fazer um componente para a tabela
  return (
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
            id="search-bar"
            className="max-w-sm"
            placeholder="Buscar Funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button id="new-employee-btn">
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
              <TableHead className="font-bold">Data de Nascimento</TableHead>
              <TableHead className="font-bold">Tipo de Contratação</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
              <TableHead className="font-bold text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayedEmployees.map((employee, idx) => (
              <TableRow
                key={employee.id}
                id={`employee-row-${idx}`}
              >
                <TableCell id={`employee-row-${idx}-name`}>
                  {employee.name}
                </TableCell>
                <TableCell id={`employee-row-${idx}-email`}>
                  {employee.email}
                </TableCell>
                <TableCell id={`employee-row-${idx}-cpf`}>
                  {employee.cpf}
                </TableCell>
                <TableCell id={`employee-row-${idx}-phone`}>
                  {employee.phone}
                </TableCell>
                <TableCell id={`employee-row-${idx}-dob`}>
                  {FormatDateToString(employee.dateOfBith)}
                </TableCell>
                <TableCell id={`employee-row-${idx}-hiring`}>
                  {employee.typeOfHiring}
                </TableCell>
                <TableCell id={`employee-row-${idx}-status`}>
                  <div className="flex justify-center items-center">
                    {employee.status ? (
                      <Badge className="bg-green-300 text-black">Ativo</Badge>
                    ) : (
                      <Badge className="bg-red-300 text-black">Inativo</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell id={`employee-row-${idx}-actions`}>
                  <div className="flex justify-center items-center">
                    <Button
                      variant="ghost"
                      id={`employee-row-${idx}-edit-btn`}
                    >
                      <Link href={`edit/${employee.id}`}>
                        <ClipboardEdit />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => onDelete(employee.id)}
                      id={`employee-row-${idx}-delete-btn`}
                    >
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
  );
}
