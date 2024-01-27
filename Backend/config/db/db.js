import pg from "pg";
import { db } from "./conectionDb.js";

export const pool = new pg.Pool(db);

//DB on-line
pool.on("connect", () => console.log("📡 DB ON-LINE"));
