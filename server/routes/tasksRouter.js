const pool = require ('../modules/pool.js');
const express = require('express');
const { resolveObjectURL } = require('buffer');
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

router.post('/', (req, res) => {
    console.log('in POST /tasks');
    console.log('req.body:', req.body);
    const newTask = req.body;
    const sqlText = `
    INSERT INTO "tasks"
        ("tasksName", "taskStatus")
    VALUES
        ($1, $2);
    `;
    const sqlValues = [
        newTask.tasksName,
        newTask.taskStatus
    ];
    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
            console.log('INSERT was successful.');
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});