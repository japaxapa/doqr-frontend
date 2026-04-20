import HomeHeader from "@/components/ui/Home/HomeHeader";
import HomeContent from "@/components/ui/Home/HomeContent";
import { GetEmployees } from "./actions";

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
