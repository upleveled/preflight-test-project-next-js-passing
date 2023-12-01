import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      logos (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        NAME VARCHAR(20) NOT NULL
      )
  `;

  await sql`
    INSERT INTO
      logos (NAME)
    VALUES
      (
        'Next.js'
      ),
      (
        'Next.js'
      ),
      (
        'Next.js'
      ),
      (
        'Next.js'
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE logos `;
}
