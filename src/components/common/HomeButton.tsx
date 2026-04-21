import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/">
      <Button
        variant={"ghost"}
        className="font-bold px-0"
      >
        <ArrowLeft /> Voltar
      </Button>
    </Link>
  );
}
