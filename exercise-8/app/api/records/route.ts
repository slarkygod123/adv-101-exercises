import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowsProps } from "../login/route";

export async function GET(){
    try{
        const [datas] = await db.query<RowsProps[]>("SELECT user_id, username FROM users");

        if(datas.length <= 0) return NextResponse.json({ errorMessages: "No users found" }, { status: 200 });

        return NextResponse.json({ users: datas }, { status: 200 });
    }catch(err: unknown){
        return NextResponse.json({ errorMessage: err instanceof Error ? err.message : "Something went wrong on the server side." }, { status: 500 });
    }
}