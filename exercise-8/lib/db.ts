import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: `${process.env.db_pass as string}`,
    database: "exercise8"
})