const pool = require ('../modules/pool.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const sqlText = 'SELECT * FROM tasks;';
    pool.query(sqlText)
    .then((dbResult)=> { 
        console.log(`${dbResult.rows.length} rows to send.`)
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
        ("tasksName","taskStatus")
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

router.put('/upvotes/:id', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    const taskIdToUpdate = req.params.id;
    const sqlText = `
    UPDATE "tasks"
    SET "tasksName"=$1
    WHERE "Id"=$2;
    `;
    const sqlValues = [
        currentTask,
        taskIdToUpdate
    ]
    pool.query(sqoText, sqlValues)
    .then((dbResult)=> {
        res.sendStatus(200);
    })
    .catch((dbErr)=> {
        console.error(dbErr);
        res.sendStatus(500);
    })
});

router.delete('/', (req,res)=> {
    console.log('in DELETE /tasks');
    console.log('req.params:', req.params);
    const taskIdToDelete = req.params.id;
    const sqlText = `
    DELETE FROM "tasks"
        WHERE "id"=$1;
        `;
    const sqlValues = [ taskIdToDelete];

    pool.query(sqlText, sqlValues)
    .then((deResult)=> {
        res.sendStatus(200);
    })
    .catch((dbErr)=>{
        console.error(dbErr);
        res.sendStatus(500);
    })
});

module.exports = router; 
