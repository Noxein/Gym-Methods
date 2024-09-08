import { CenterComponent } from "@/app/components/CenterComponent";
import { LoginForm } from "@/app/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zaloguj / Mordor",
    description: "Aplikacja na siłownie",
  };
  
export default function Login(){
    return(
        <CenterComponent>
            <LoginForm />
        </CenterComponent>
    )
}