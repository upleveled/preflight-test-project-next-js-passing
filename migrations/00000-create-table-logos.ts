import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE logos (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(20) NOT NULL
    )
  `;

  await sql`
    INSERT INTO logos
      (name)
    VALUES
      ('Next.js'),
      ('Next.js'),
      ('Next.js'),
      ('Next.js')
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE logos
  `;
}
