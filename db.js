import postgres from 'postgres';
import { setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

const sql = postgres();
// 'postgres://preflight_test_project_next_js_passing:preflight_test_project_next_js_passing@localhost:5432/preflight_test_project_next_js_passing',

console.log(
  await sql`
    SELECT
      1
  `,
);

// This is only for the example, in your code you will want
// a persistent connection to the database
await sql.end();
