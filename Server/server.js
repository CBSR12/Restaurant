const express = require('express');
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT;
const POOL = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
    if(err) return console.error("Could not connect: ", err.stack);
    client.query("SELECT NOW()", (err, res) => {
        release()
        if(err) return console.error("Issue executing query", err.stack)
        console.log("Successfully connected to Database"); 
    })
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Final Project 412 Server");
})

app.get("/testNow", (req, res) => {
    console.log("Testing for now: ")

    pool.query("select * from customer limit 10")
    .then(supData => {
        console.log(supData)
        res.send(supData.rows)
    })
})



app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
})