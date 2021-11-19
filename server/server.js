const express = require('express');

const app = express();

const PORT = 5000;

// const router = require('./routes/taskRouter');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('server/public'));

// app.use('/tasks', taskRouter);

app.listen(PORT, ()=>{
    console.log(`First App's server is working. Go to: http://localhost:${PORT}`)
});