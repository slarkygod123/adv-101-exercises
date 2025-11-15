import FormContent from "@/components/form-content";
import { AuthProvider } from "@/context/auth-context";

export default function Register(){
    return <FormContent titleHeader="Create an account" buttonTitle="Register" formType="Register" />
}