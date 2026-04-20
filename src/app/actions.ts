"use server";

import { employee } from "@/types/employee";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GetEmployees(): Promise<employee[]> {
  const data = await fetch("https://api-testefrontend.qforms.com.br/employees");
  const employees = (await data.json()) as employee[];

  return employees;
}

export async function GetEmployee(id: string): Promise<employee | undefined> {
  if (!id || id == "new") return undefined;

  const res = await fetch(
    `https://api-testefrontend.qforms.com.br/employees/${id}`,
  );

  // TODO tratar esse caso com redirect
  if (res.status !== 200) return undefined;
  return res.json();
}

export async function CreateEmployee(data: Partial<employee>) {
  if (data.id) {
    // TODO tratar este caso
  }

  try {
    const res = await fetch(
      "https://api-testefrontend.qforms.com.br/employees",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Erro ao criar funcionário! Status: ${res.status}`);
    }
  } catch (error) {
    // TODO error handling
    console.error(error);
  }

  revalidatePath("/");
  redirect("/");
}

export async function UpdateEmployee(data: employee) {
  try {
    const res = await fetch(
      `https://api-testefrontend.qforms.com.br/employees/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error(`Erro ao atualizar funcionário! Status: ${res.status}`);
    }
  } catch (error) {
    // TODO error handling
    console.error(error);
  }

  revalidatePath("/");
  redirect("/");
}

export async function DeleteEmployee(id: number) {
  try {
    await fetch(`https://api-testefrontend.qforms.com.br/employees/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    // TODO error handling
    console.error(error);
  }

  revalidatePath("/");
  redirect("/");
}
