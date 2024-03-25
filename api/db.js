import pg from "pg";

const pool = new pg.Pool({
  user: "sofia",
  password: "2222",
  host: "localhost",
  port: "5434",
  database: "auth",
});

export default pool;
