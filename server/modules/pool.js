const pg = require ('pg');
const Pool = pg.Pool;

const config = {
    host: 'localhost',
    database:'tasks'
};

const pool = new Pool(config);

pool.on('connect', () =>{
    console.log('server-database connection is working.');
});

pool.on('error', (poolError) => {
    console.error(poolError);
});

module.exports = pool;