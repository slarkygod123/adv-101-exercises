import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
      const { username, password } = await req.json();
      if(!username || !password) return NextResponse.json({ errorMessage: "Invalid Register, please fill up the required fields." }, { status: 400 });

      await db.query(
        `INSERT INTO users (username, password) VALUES(?, ?)`,
        [ username, password ]
      );

      return NextResponse.json(
        { registeredDatas: {
            username, password
        } },
        { status: 200 }
    )
  }catch(err: unknown){
    return NextResponse.json({ errorMessage: err instanceof Error ? err.message : "Something went wrong on the server side."}, { status: 500 })
  }
}