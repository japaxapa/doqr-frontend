import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import HomeContent from "@/components/Home/HomeContent";
import { GetEmployees } from "@/services/employee.service";

export default function Home() {
  const employees = GetEmployees();

  return (
    <PageContainer page="employees">
      <PageHeader
        page="employees"
        title="Controle de Funcionários"
        sub="Empresa DoQR Tecnologia"
      />

      <HomeContent employees={employees} />
    </PageContainer>
  );
}
