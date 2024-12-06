const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
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
app.use(cors());

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

//route that I am posting to to insert a party into the database
app.post("/party", async (req, res) => {
   console.log("Attempting party insertion: ")
   let partyValues = req.body;
   
   const query = {
    text: 'INSERT INTO PARTY (customer_id, additionalAllergies, size, no_children, handicapped, indoor_outdoor) VALUES ($1, $2, $3, $4,  $5, $6) RETURNING *',
    values: [partyValues.cId, partyValues.allergies, partyValues.totPeople, partyValues.numKids, partyValues.handicap, partyValues.seatPref],
   }

   try {
    const db = await pool.query(query);
    console.log("Print order: clientQuery return then just first row")
    console.log(db);
    console.log(db.rows[0]);
    res.status(201).send(db.rows[0]);
   } catch (err) {
    console.error("Issue inserting the party", err);
    res.status(500).send({error: "Failed"})
   }
   
   
})



app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
})