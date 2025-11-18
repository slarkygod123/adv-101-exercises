"use client"
import { RowsProps } from "@/app/api/login/route";
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardContainer(){
    const { formData, clearFormData } = useAuth();
    const [ records, setRecords ] = useState<{
        user_id: number;
        username: string;
    }[] | null>(null);
    const [ isFetching, setIsFetching ] = useState(false);
    const router = useRouter();

    const handleFetchRecords = async () => {
        try{
            setIsFetching(true);
            await new Promise(res => setTimeout(res, 2000));
            const res = await fetch("/api/records");
            const data = await res.json();
            if(!res.ok) throw new Error(data?.errorMessage);

            setIsFetching(false);
            setRecords(data.users);
        }catch{
            setIsFetching(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-bold text-xl">Welcome</h1>
            <span>user_id: {formData?.user_id}</span>
            <span>username: {formData?.username}</span>
            <button 
            className="border-2 border-black rounded-md py-1 px-5 mt-2"
            onClick={() => {router.replace("/login"); console.log("logged out as", formData); clearFormData(); setRecords(null)}}>
            Logout
            </button>
            <button 
            className="border-2 border-black rounded-md py-1 px-5 mt-2 mb-5"
            onClick={handleFetchRecords}>
            { isFetching ? "Fetching..." : "Fetch Records"}
            </button>

            {isFetching ? <p className="text-center h-50">Fetching....</p> : (
                records?.map((r, _) => (<span key={r.user_id}>{"user_id: "}{r.user_id}{" => "}{r.username}</span>))
            )}
        </div>
    );
}