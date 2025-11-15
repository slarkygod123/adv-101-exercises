"use client"
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const { formData, clearFormData } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        router.replace("/login");

        setTimeout(() => {
            clearFormData();
        }, 1000)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <span className="text-lg">Welcome to Dashboard</span>
            <p>{formData?.username}</p>
            <button 
            onClick={handleLogout}
            className="border-2 border-black rounded-md py-2 px-7 mt-1">Logout</button>
        </div>
    );
}