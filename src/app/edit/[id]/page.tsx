import HomeButton from "@/components/common/HomeButton";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import EmployeeForm from "@/components/Form/EmployeeForm";
import { GetEmployee } from "@/services/employee.service";

export default async function Edit({ params }: { params: { id: string } }) {
  const { id } = await params;

  const employee = await GetEmployee(id);

  return (
    <PageContainer page="employee" styles="py-8">
      <HomeButton />

      <PageHeader
        page="employee"
        title="Editar Funcionário"
        sub="Empresa DoQR Tecnologia"
      />

      <EmployeeForm employee={employee} />
    </PageContainer>
  );
}
