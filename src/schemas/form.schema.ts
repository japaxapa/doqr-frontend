"use client";

import type { employee } from "@/types/employee";
import { FormatDateToString } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(6, "Nome do empregado deve ser por extenso.")
    .max(40, "Nome do empregado deve ter no máximo 40 caracteres."),
  email: z.email({ message: "Insira um email válido." }),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido. Use o formato 000.000.000-00",
    ),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Número de celular deve ser no formato (XX) XXXXX-XXXX",
    ),
  // TODO checar como fazer esse input ser feito com z.iso.datetime()
  // TODO checar se é possível fazer o input com date picker
  dateOfBirth: z
    .string()
    .regex(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "Data inválida.",
    ),
  typeOfHiring: z.enum(["CLT", "PJ", ""]),
  status: z.boolean({ message: "Selecione um status." }),
});

export function CreateForm(employee?: employee) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      cpf: employee?.cpf || "",
      phone: employee?.phone || "",
      dateOfBirth: FormatDateToString(employee?.dateOfBith) || "",
      typeOfHiring: (employee?.typeOfHiring as "CLT" | "PJ" | "") || "",
      status: employee ? employee.status : undefined,
    },
  });
  return form;
}

export type employeeFormData = z.infer<typeof formSchema>;
