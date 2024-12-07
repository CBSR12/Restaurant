const { Pool } = require('pg');

const pool = new Pool({
    user: 'Atsuki',                // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'restaurant_reservation_system', // Replace with your PostgreSQL database name
    password: '0520',     // Replace with your PostgreSQL password
    port: 5432                     // Replace with your PostgreSQL port
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error connecting to database:', err.stack);
    }
    console.log('Connected to database');
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query:', err.stack);
        }
        console.log('Query result:', result.rows);
    });
});
