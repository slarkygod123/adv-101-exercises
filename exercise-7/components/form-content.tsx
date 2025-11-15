"use client"
import {useAuth} from "@/context/auth-context"
import { useRouter } from "next/navigation";

interface FormContentProps {
  titleHeader: string;
  buttonTitle: string;
  formType: String;
}

export default function FormContent({ titleHeader, buttonTitle, formType }: FormContentProps) {
  const { setFormData, formData } = useAuth();
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const username = form.get("username") as string;
    const password = form.get("password") as string;

    if (formType === "Register") {
        
        setFormData({
            username,
            password,
        })
        console.log("---Registered Successfully---");
        console.log("Username: ", username);
        console.log("Password: ", password);

        router.push("/login");
    } 
    
    if(formType === "Login"){
        if(username !== formData?.username){
            console.log("Input Username: ", username);
            console.log("Context Username: ", formData?.username);
            alert("Invalid username");
            return;
        }

        if(password !== formData?.password){
          console.log("Input Password: ", password);
          console.log("Context Password: ", formData?.password);
          alert("Invalid password");
          return;
        }
    
        console.log("Logged in as: ", username);
        router.push("/dashboard"); 
    }    
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">

      <form onSubmit={handleFormSubmit} className="flex flex-col w-100 bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{titleHeader}</h1>
        <label htmlFor="username" className="block mb-1 font-medium">Username</label>
        <input
          name="username"
          id="username"
          type="text"
          placeholder="Enter your username"
          className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          className="block w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {buttonTitle}
        </button>
      </form>
    </div>
  );
}