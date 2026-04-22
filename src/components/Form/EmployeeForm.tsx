"use client";

import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { employee } from "@/types/employee";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormatFormDOBtoInput } from "@/utils";
import { useHookFormMask } from "use-mask-input";
import { CreateForm } from "@/schemas/form.schema";
import type { employeeFormData } from "@/schemas/form.schema";
import {
  CreateEmployee,
  DeleteEmployee,
  UpdateEmployee,
} from "@/services/employee.service";

export default function EmployeeForm({ employee }: { employee?: employee }) {
  const form = CreateForm(employee);

  const registerWithMask = useHookFormMask(form.register);

  // TODO toaster
  // TODO checar se precisa ser bloquear usuário durante uso
  function onSubmit(data: employeeFormData) {
    const dateOfBirth = FormatFormDOBtoInput(data.dateOfBirth);

    if (employee && employee.id) {
      UpdateEmployee({ ...data, id: employee.id, dateOfBith: dateOfBirth });
    } else {
      CreateEmployee({ ...data, dateOfBith: dateOfBirth });
    }
  }

  // TODO toaster
  // TODO modal para confirmação
  // TODO checar se precisa ser bloquear usuário durante uso
  function onDelete(id: number) {
    if (id) DeleteEmployee(id);
  }

  // TODO extrair inputs
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
                    {...registerWithMask("cpf", "999.999.999-99")}
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
                    {...registerWithMask("phone", "(99) 99999-9999")}
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
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="employee-form-dob"
                    className="font-bold"
                  >
                    Data de Nascimento
                  </FieldLabel>
                  <Input
                    {...field}
                    {...registerWithMask("dateOfBirth", "99/99/9999")}
                    id="employee-form-dob"
                    aria-invalid={fieldState.invalid}
                    placeholder="00/00/0000"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
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
                    value={field.value}
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
                    value={
                      field.value == undefined
                        ? ""
                        : field.value === true
                          ? "true"
                          : "false"
                    }
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
              <Button
                id="delete-employee-btn"
                className="font-bold bg-delete p-4"
                type="button"
                onClick={() => onDelete(employee.id)}
              >
                Excluir
              </Button>
              <Button
                id="update-employee-btn"
                className="font-bold p-4"
                type="submit"
                form="employee-form"
              >
                Salvar
              </Button>
            </Field>
          ) : (
            <Field
              orientation={"horizontal"}
              className="mt-4"
            >
              <Button
                id="create-employee-btn"
                className="font-bold p-4"
                type="submit"
                form="employee-form"
              >
                Cadastrar
              </Button>
            </Field>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
