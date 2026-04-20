"use client";

import { Field } from "../field";
import { Input } from "../input";
import { Button } from "../button";
import Link from "next/link";
import { ClipboardEdit, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { FormatDateToString } from "@/app/utils";
import { Badge } from "../badge";
import { DeleteEmployee } from "@/app/actions";
import { employee } from "@/types/employee";
import { use, useEffect, useState } from "react";

interface IHomeContent {
  employees: Promise<employee[]>;
}

export default function HomeContent({ employees }: IHomeContent) {
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

  function onDelete(id: number) {
    if (id) {
      DeleteEmployee(id);
    }
  }

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
            className="max-w-sm"
            placeholder="Buscar Funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <TableHead className="font-bold">Data de Nascimento</TableHead>
              <TableHead className="font-bold">Tipo de Contratação</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
              <TableHead className="font-bold text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.cpf}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{FormatDateToString(employee.dateOfBith)}</TableCell>
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
                    <Button
                      variant="ghost"
                      onClick={() => onDelete(employee.id)}
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
