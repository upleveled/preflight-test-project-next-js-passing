import safeql from '@ts-safeql/eslint-plugin';
import eslintTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

(await import('dotenv-safe')).config();

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray} */
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
              databaseUrl: `postgres://safeql:safeql@localhost:5432/safeql`,
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
