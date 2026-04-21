import { GetEmployee } from "@/app/services/employee.service";
import HomeButton from "@/components/common/HomeButton";
import EmployeeForm from "@/components/Form/EmployeeForm";

export default async function Edit({ params }: { params: { id: string } }) {
  const { id } = await params;

  const employee = await GetEmployee(id);

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
