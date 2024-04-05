import safeql from '@ts-safeql/eslint-plugin';
import eslintTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

if (
  'postgres' in
  ((
    await import(`${process.cwd()}/package.json`, {
      assert: { type: 'json' },
    })
  ).default.dependencies || {})
) {
}
(await import('dotenv-safe')).config();

/** @type
 * {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray}
 * */
const config = [
  {
    files: ['migrations/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      '@ts-safeql': safeql,
      '@typescript-eslint': {
        rules: eslintTypescript.rules,
      },
    },
    rules: {
      '@ts-safeql/check-sql': [
        'error',
        {
          connections: [
            {
              databaseUrl: `postgres://preflight_test_project_next_js_passing:preflight_test_project_next_js_passing@localhost:5432/preflight_test_project_next_js_passing`,
              targets: [
                {
                  tag: 'sql',
                  fieldTransform: 'camel',
                  transform: '{type}[]',
                },
              ],
              overrides: {
                types: {
                  json: 'JsonAgg',
                },
              },
            },
          ],
        },
      ],
    },
  },
];

export default config;
