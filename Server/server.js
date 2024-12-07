const express = require('express');
const dotenv = require("dotenv");
const { Pool } = require("pg");
const cors = require('cors');
const restaurantRoutes = require('./restaurant'); // Import restaurant routes

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
    if(err) return console.error("Could not connect: ", err.stack);
    client.query("SELECT NOW()", (err, res) => {
        release()
        if(err) return console.error("Issue executing query", err.stack)
        console.log("Successfully connected to Database"); 
    });
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(
   
));

// Routes
app.get("/", (req, res) => {
    res.send("Final Project 412 Server");
});


app.get("/testNow", (req, res) => {
    console.log("Testing for now: ")

    pool.query("select * from customer limit 10")
    .then(supData => {
        console.log(supData)
        res.send(supData.rows)
    })
    .catch(err => {
        console.error("Issue executing query", err.stack);
        res.status(500).send("Error querying the database");
    });
});

app.use('/Restaurant', restaurantRoutes);

app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
});