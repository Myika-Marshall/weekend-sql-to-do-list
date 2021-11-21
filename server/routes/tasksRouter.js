const pool = require ('../modules/pool.js');
const express = require('express');
const router = express.router();

router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const sqlText = 'SELECT * FROM tasks;';
    pool.query(sqlText)
    .then((dbresult)=>{
        console.log(`${dbResult.rows.length}rows to send.`)
        res.send(dbResult.rows);
    })
    .catch((dbErr)=> {
        console.error(dbErr);
        res.sendStatus(500);
    });
});