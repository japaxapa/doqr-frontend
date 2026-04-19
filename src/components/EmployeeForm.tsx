"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { employee } from "@/types/employee";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(6, "Nome do empregado deve ser por extenso.")
    .max(40, "Nome do empregado deve ter no máximo 40 caracteres."),
  email: z.email(),
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
  dateOfBirth: z.iso.datetime().optional().or(z.literal("")),
  typeOfHiring: z.enum(["CLT", "PJ"]),
  status: z.boolean(),
});

export default function EmployeeForm({ employee }: { employee?: employee }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      cpf: employee?.cpf || "",
      phone: employee?.phone || "",
      dateOfBirth: employee?.dateOfBith || "",
      typeOfHiring: (employee?.typeOfHiring as "CLT" | "PJ") || "CLT",
      status: employee?.status ?? false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card>
      <CardContent>
        <form
          id="employee-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="grid grid-cols-3 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-name"
                    className="font-bold"
                  >
                    Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id="employee-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-email"
                    className="font-bold"
                  >
                    E-mail
                  </FieldLabel>
                  <Input
                    {...field}
                    id="employee-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="e-mail"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="cpf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-cpf"
                    className="font-bold"
                  >
                    CPF
                  </FieldLabel>
                  <Input
                    {...field}
                    id="employee-form-cpf"
                    aria-invalid={fieldState.invalid}
                    placeholder="000.000.000-00"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-phone"
                    className="font-bold"
                  >
                    Celular
                  </FieldLabel>
                  <Input
                    {...field}
                    id="employee-form-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="(XX) XXXXX-XXXX"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => {
                const date = field.value;
                const formattedDate = date
                  ? new Date(date).toLocaleDateString("pt-BR")
                  : undefined;

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="employee-form-dob"
                      className="font-bold"
                    >
                      Data de Nascimento
                    </FieldLabel>
                    <Input
                      {...field}
                      id="employee-form-dob"
                      aria-invalid={fieldState.invalid}
                      value={formattedDate}
                      placeholder="00/00/0000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            <Controller
              name="typeOfHiring"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-hiring"
                    className="font-bold"
                  >
                    Tipo de Contratação
                  </FieldLabel>
                  <select
                    {...field}
                    id="employee-form-hiring"
                    aria-invalid={fieldState.invalid}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={employee ? field.value : ""}
                  >
                    <option
                      value=""
                      disabled
                      hidden
                    >
                      Selecione uma opção...
                    </option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-status"
                    className="font-bold"
                  >
                    Status
                  </FieldLabel>
                  <select
                    id="employee-form-status"
                    aria-invalid={fieldState.invalid}
                    value={employee ? (field.value ? "true" : "false") : ""}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option
                      value=""
                      disabled
                      hidden
                    >
                      Selecione uma opção...
                    </option>
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {employee ? (
            <Field
              orientation={"horizontal"}
              className="mt-4"
            >
              <Button className="font-bold bg-delete p-4">Excluir</Button>
              <Button className="font-bold p-4">Salvar</Button>
            </Field>
          ) : (
            <Field
              orientation={"horizontal"}
              className="mt-4"
            >
              <Button className="font-bold p-4">Cadastrar</Button>
            </Field>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
