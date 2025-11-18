import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export type RowsProps = RowDataPacket & {
  username: string;
  password: string;
};

export async function POST(req: NextRequest){
    try{
      const { username, password } = await req.json();
      if(!username || !password) return NextResponse.json({ errorMessage: "Invalid Login, please fill up the required fields." }, { status: 400 });


      const [rows] = await db.query<RowsProps[]>(
        "SELECT user_id, username, password FROM users WHERE username = ? AND password = ?",
        [username, password]
      );
      
     if(rows[0].username !== username) return NextResponse.json({ errorMessage: "Invalid username, please try again" }, { status: 400 });
     if(rows[0].password !== password) return NextResponse.json({ errorMessage: "Invalid password, please try again" }, { status: 400 });

      return NextResponse.json(
        { loggedinDatas: rows[0] },
        { status: 200 }
    )
  }catch(err: unknown){
    return NextResponse.json({ errorMessage: err instanceof Error ? err.message : "Something went wrong on the server side."}, { status: 500 })
  }
}