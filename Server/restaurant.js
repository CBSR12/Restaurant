const express = require('express');
const router = express.Router();
const{ Pool } = require('pg');



// Database connection setup
const pool = new Pool({
  user: 'Atsuki',
  host: 'localhost',
  database: 'restaurant_reservation_system',
  password: '0520',
  port: 5432
});

// Fetch restaurants data
router.get('/', async (req, res) => {
  try {
    const query = `
    SELECT r.r_name, r.cuisine_type, rt.average_rating
    FROM restaurant r
    JOIN rating rt ON r.restaurantid = rt.restaurantid
    `;

    const result = await pool.query(query); 
    console.log("Fetched Data: ", result.rows);
    res.json(result.rows); // sends the combined data
   
    
  } catch (err) {
    console.error('Error fetching restaurants', err.stack);
    res.status(500).send('Server Error');
  }
});

module.exports = router;