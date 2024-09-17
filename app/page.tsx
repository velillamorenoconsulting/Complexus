import { Card, CardBody, Input } from "@nextui-org/react";
import AuthComponent from "./components/login-register/AuthComponent";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full h-screen">
      <AuthComponent type="register" />
    </main>
  );
}
