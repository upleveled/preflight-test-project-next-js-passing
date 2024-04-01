import { setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();
console.log(process.env)
const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
