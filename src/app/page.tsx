import HomeHeader from "@/components/Home/HomeHeader";
import HomeContent from "@/components/Home/HomeContent";
import { GetEmployees } from "./services/employee.service";

export default function Home() {
  const employees = GetEmployees();

  return (
    <div
      id="employees-page"
      className="flex justify-center"
    >
      <div
        id="employees-container"
        className="flex flex-col flex-1 max-w-7xl"
      >
        <HomeHeader />

        <HomeContent employees={employees} />
      </div>
    </div>
  );
}
