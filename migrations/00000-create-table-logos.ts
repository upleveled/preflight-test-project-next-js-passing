import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE logos (
      id integer PRIMARY key generated always AS identity,
      name varchar(20) NOT NULL
    )
  `;

  await sql`
    INSERT INTO
      logoos (name)
    VALUES
      ('Next.js'),
      ('Next.js'),
      ('Next.js'),
      ('Next.js')
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE logos`;
}
