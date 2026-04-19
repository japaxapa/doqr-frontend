import EmployeeForm from "@/components/EmployeeForm";
import HomeButton from "@/components/HomeButton";
import { employee } from "@/types/employee";

async function getEmployee(id: string): Promise<employee | undefined> {
  const res = await fetch(
    `https://api-testefrontend.qforms.com.br/employees/${id}`,
  );

  if (res.status !== 200) return undefined;
  return res.json();
}

export default async function Edit({ params }: { params: { id: string } }) {
  const { id } = await params;

  const employee = await getEmployee(id);

  return (
    <div className="flex justify-center">
      <div className="flex-1 flex-col max-w-7xl py-6">
        <HomeButton />

        <div className="flex flex-col py-4">
          <h1 className="font-bold text-4xl pb-2">Editar Funcionário</h1>
          <h2 className="font-bold text-xl">Empresa DoQR Tecnologia</h2>
        </div>
        <EmployeeForm employee={employee} />
      </div>
    </div>
  );
}
