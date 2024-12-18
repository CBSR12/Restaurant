const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { Pool } = require("pg");

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
app.use(cors());

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

app.use('/Restaurant', async (req, res) => {
  try {
    const query = `
    SELECT restaurant.restaurantid, restaurant.r_name, restaurant.cuisine_type, rating.average_rating
    FROM restaurant
    JOIN rating ON restaurant.restaurantid = rating.restaurantid
    `;

    const result = await pool.query(query); 
    console.log("Fetched Data: ", result.rows);
    res.json(result.rows); // sends the combined data
  } catch (err) {
    console.error('Error fetching restaurants', err.stack);
    res.status(500).send('Server Error');
  }
});

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


// Add a new route for handling login requests
// Login route to validate user credentials
app.post("/login", async (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
      return res.status(400).send({ error: "Login ID and password are required." });
  }

  const query = {
    //   text: 'SELECT * FROM Login WHERE login_id = $1 AND password = $2',
    //   values: [login_id, password]
      text: 'SELECT l.login_id, l.password, c.customer_id, c.c_name, c.allergies, c.phoneNumber, c.pastReservation, c.upComingReservation FROM Login l JOIN Customer c ON l.customer_id = c.customer_id WHERE l.login_id = $1 AND l.password = $2',
      values: [login_id, password]

  };

  try {
      const result = await pool.query(query);

      if (result.rowCount > 0) {
          console.log("Login successful for user:", login_id);
          res.status(200).send({ message: "Login successful", user: result.rows[0] });  
      } else {
          console.error("Invalid credentials for:", login_id);
          res.status(401).send({ error: "Invalid credentials" });
      }
  } catch (err) {
      console.error("Error during login:", err);
      res.status(500).send({ error: "An error occurred during login" });
  }
});





// Get customer details by ID
// Fetch customer details by ID// Fetch customer data
app.get("/customer/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const query = "SELECT * FROM Customer WHERE customer_id = $1";
      const result = await pool.query(query, [id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (err) {
      console.error("Error fetching customer data:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  });
  
  // Update customer data
  app.put("/customer/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { c_name, allergies, phonenumber } = req.body.user;
    console.log("Received parameters:", { id, c_name, allergies, phonenumber });

    try {
      const query = `
        UPDATE Customer 
        SET c_name = $1, allergies = $2, phoneNumber = $3 
        WHERE customer_id = $4 
        RETURNING *`;
      const values = [c_name, allergies || null, phonenumber, id];
      const result = await pool.query(query, values);
      if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (err) {
      console.error("Error updating customer data:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  });
  



app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
});