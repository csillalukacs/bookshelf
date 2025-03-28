import postgres from "postgres"

// Extend the global scope to include the 'sql' property
declare global 
{
  var sql: ReturnType<typeof postgres> | undefined;
}

let sql: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") 
{
    sql = postgres(process.env.POSTGRES_URL!); 
} 
else 
{
  if (!global.sql) 
{
    // const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
    // above doesn't work on mac, todo figure out why
    // neither does const sql = postgres(process.env.POSTGRES_URL!, { ssl: { rejectUnauthorized: false } });
    // we are rambling to ourselves in comments now

    // btw the ! means this is not null or undefined, a "non-null assertion operator"
    // in case the type checker doesn't know that. but i do 😈
    global.sql = postgres(process.env.POSTGRES_URL!);
  }

  sql = global.sql;
}

export default sql;