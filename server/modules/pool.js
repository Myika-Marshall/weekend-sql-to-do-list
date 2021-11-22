const pg = require('pg');
const Pool = pg.Pool;

const config = {
  host: 'localhost',
  database: 'tasks'
};

const pool = new Pool(config);