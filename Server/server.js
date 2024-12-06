const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT;

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
    //res.render("SignUpPage.jsx");
})

app.get("/testNow", (req, res) => {
    console.log("Testing for now: ")

    pool.query("select * from Login")
    .then(supData => {
        console.log(supData)
        res.send(supData.rows)
    })
})
app.post("/signup", async (req, res) => {
    console.log("Attempting signup...");
    const userData = req.body;

    // Validate inputs
    if (!userData.name || !userData.phoneNumber || !userData.loginId || !userData.password) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        // Step 1: Check if login_id already exists
        const checkLoginQuery = {
            text: 'SELECT COUNT(*) FROM Login WHERE login_id = $1',
            values: [userData.loginId],
        };

        const checkLoginResult = await pool.query(checkLoginQuery);
        if (parseInt(checkLoginResult.rows[0].count) > 0) {
            return res.status(400).send({ error: "Login ID already exists. Please choose a different login ID." });
        }

        // Step 2: Insert into Customer table
        const customerQuery = {
            text: 'INSERT INTO Customer (c_name, phoneNumber) VALUES ($1, $2) RETURNING customer_id',
            values: [userData.name, userData.phoneNumber],
        };

        const customerResult = await pool.query(customerQuery);
        const customerId = customerResult.rows[0].customer_id;

        // Step 3: Insert into Login table
        const loginQuery = {
            text: 'INSERT INTO Login (customer_id, login_id, password) VALUES ($1, $2, $3) RETURNING *',
            values: [customerId, userData.loginId, userData.password],
        };

        const loginResult = await pool.query(loginQuery);

        console.log("Signup successful:", loginResult.rows[0]);
        res.status(201).send({ message: "Signup successful!" });
    } catch (err) {
        // Handle unique constraint error for login_id
        if (err.code === '23505' && err.constraint === 'login_pkey') {
            return res.status(400).send({ error: "Login ID already exists. Please choose a different login ID." });
        }

        console.error("Error during signup:", err);
        res.status(500).send({ error: "Signup failed. Please try again." });
    }
});

app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
})