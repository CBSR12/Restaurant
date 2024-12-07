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
// Get all reservations
// Get reservation details by ID
// app.get("/reservation/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const query = `
//       SELECT 
//         c.c_name, 
//         c.phonenumber, 
//         r.restaurant_name, 
//         r.restaurant_address, 
//         res.party_size
//       FROM 
//         Reservation res
//       JOIN Customer c ON res.customer_id = c.customer_id
//       JOIN Restaurant r ON res.restaurant_id = r.restaurant_id
//       WHERE res.reservation_id = $1
//     `;
//     const result = await pool.query(query, [id]);

//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ error: "Reservation not found" });
//     }
//   } catch (err) {
//     console.error("Error fetching reservation data:", err);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });


// // Post route to create a reservation
// // Route to handle reservation insertion
// app.post("/reservation", async (req, res) => {
//   console.log("Attempting reservation insertion: ");
//   const reservationValues = req.body; // Data coming from the client

//   // Validate incoming data
//   const { table_number, reservation_date, status, payment_method } = reservationValues;

//   // Check if all required fields are provided
//   if ( !table_number || !reservation_date || !status || !payment_method) {
//       return res.status(400).send({ error: "All fields must be provided" });
//   }

//   const query = {
//       text: `INSERT INTO Reservation (restaurantID, party_id, table_number, reservation_date, status, payment_method) 
//              VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *`,
//       values: [restaurantID, party_id, table_number, reservation_date, status, payment_method],
//   };

//   try {
//       const result = await pool.query(query);  // Execute query
//       console.log("Reservation added:", result.rows[0]);
//       res.status(201).send(result.rows[0]); // Respond with the created reservation
//   } catch (err) {
//       console.error("Error inserting reservation:", err);
//       res.status(500).send({ error: "Failed to insert reservation" });
//   }
// });


// // Update reservation status (example: from "pending" to "confirmed")
// app.put("/reservation", async (req, res) => {
//   const { id } = req.params;  // 'id' corresponds to 'reservationID'
//   const { status } = req.body;

//   try {
//       const query = {
//           text: 'UPDATE Reservation SET status = $1 WHERE reservationID = $2 RETURNING *',
//           values: [status, id],
//       };

//       const result = await pool.query(query);
//       if (result.rowCount > 0) {
//           res.status(200).json(result.rows[0]);
//       } else {
//           res.status(404).json({ error: "Reservation not found" });
//       }
//   } catch (err) {
//       console.error("Error updating reservation status:", err);
//       res.status(500).send({ error: "Failed to update reservation status" });
//   }
// });


// Get reservation details by party_id
app.get("/reservation/:party_id", async (req, res) => {
  const { party_id } = req.params;
  try {
    const query = "SELECT * FROM Reservation WHERE party_id = $1";
    const result = await pool.query(query, [party_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (err) {
    console.error("Error fetching reservation data:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
app.get("/reservation/:party_id/:customer_id", async (req, res) => {
  const { party_id, customer_id } = req.params;
  try {
    const query = `
      SELECT 
        r.*, 
        c.c_name AS customer_name, 
        c.phoneNumber, 
        c.allergies, 
        c.pastReservation, 
        c.upComingReservation
      FROM 
        Reservation r
      JOIN 
        Party p ON r.party_id = p.party_id
      JOIN 
        Customer c ON p.customer_id = c.customer_id
      WHERE 
        r.party_id = $1 AND c.customer_id = $2
    `;
    const result = await pool.query(query, [party_id, customer_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Reservation or Customer not found" });
    }
  } catch (err) {
    console.error("Error fetching reservation data:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});



app.listen(port, ()=> {
   console.log(`We are listening on: http://localhost:${port}`);
})