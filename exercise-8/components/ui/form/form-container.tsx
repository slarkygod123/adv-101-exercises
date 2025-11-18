"use client"

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface FormContainerProps {
    headerTitle: string;
    buttonTitle: string;
    formType: string;
}

export default function FormContainer({
    headerTitle,
    buttonTitle,
    formType
}: FormContainerProps){
    const { setFormData } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const username = form.get("username") as string;
        const password = form.get("password") as string;

        if(formType === "register") {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username, password
                })
            });

            const data = await res.json();
            if(!res.ok) alert(data?.errorMessage);

            console.log("Registered as: ", data.registeredDatas);
            router.push("/login");
        }

        if(formType === "login"){
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username, password
                })
            });

            const data = await res.json();
            if(!res.ok) alert(data?.errorMessage);

            console.log(`Logged in as: ${JSON.stringify(data?.loggedinDatas)}`);
            setFormData({
                user_id: data.loggedinDatas.user_id,
                username: data.loggedinDatas.username,
            });            
            router.push("/dashboard");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-bold text-xl mb-6">{headerTitle}</h1>

            <form 
            className="flex flex-col"
            onSubmit={handleSubmit}>
                <label htmlFor="username" className="font-medium mb-1">Username</label>
                <input 
                name="username"
                id="username"
                placeholder="Enter your username"
                className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2"
                type="text"/>
                
                <label htmlFor="password" className="font-medium mb-1">Password</label>
                <input 
                name="password"
                id="password"
                placeholder="Enter your password"
                className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2"
                type="password"/>

                <button className="border-2 border-black rounded-md py-2" type="submit">{buttonTitle}</button>
            </form>
        </div>
    );
}