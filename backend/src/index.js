// Import required modules
import pkg from "pg"; // PostgreSQL client library
import cors from "cors"; // Cross-Origin Resource Sharing middleware
import dotenv from "dotenv"; // For loading environment variables from a .env file
import express from "express"; // HTTP server framework

// Load environment variables from the .env file
dotenv.config();

// Initialize an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors({
    origin: 'http://54.246.12.50:5000/'
}));

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Define the server port from environment variables or default to 3000
const PORT = process.env.PORT || 8000;

// Destructure and initialize the PostgreSQL Client
const { Client } = pkg;
const client = new Client({
    user: process.env.DB_USER,         // PostgreSQL username (from environment variables)
    host: process.env.DB_HOST,         // PostgreSQL hostname (e.g., Docker service name or localhost)
    database: process.env.DB_NAME,     // PostgreSQL database name
    password: process.env.DB_PASSWORD, // PostgreSQL user password
    port: process.env.DB_PORT,         // PostgreSQL port (default is 5432)
});

// Connect to the PostgreSQL database
client.connect(error => {
    if (error) {
        console.error('Connection error:', error.stack); // Log connection errors
    } else {
        console.log('Connected to the database.'); // Log successful connection
    }
});

// Define a GET route for the root path
app.get('/', async (req, res) => {
    try {
        const currentTime = new Date().toLocaleTimeString(); // Get the server's current time
        const result = await client.query('SELECT NOW()');    // Query the database for its current time
        res.send(
            `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Two-Tier Application</title>
                </head>
                <body>
                    <h1>Three Tier Application - Jenkins CI-CD Pipeline 🚀</h1>
                    <p>Current time: ${currentTime}</p>
                    <p>Database time: ${result.rows[0].now}</p>
                </body>
            </html>
            `
        );
    } catch (error) {
        console.error('Error executing query:', error.stack); // Log query errors
        res.status(500).send('Error executing query.');       // Respond with an error status
    }
});

// Define a GET route to fetch all todos
app.get('/api/todos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM todos'); // Query all rows from the 'todos' table
        res.json(result.rows);                                   // Respond with the fetched rows in JSON format
    } catch (error) {
        console.error('Error fetching todos:', error.stack);     // Log errors during the query
        res.status(500).send('Error fetching todos.');           // Respond with an error status
    }
});

// Define a POST route to add a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const { task } = req.body; // Extract the 'task' property from the request body
        if (!task) {
            return res.status(400).send('Task is required'); // Validate the task input
        }
        await client.query('INSERT INTO todos (task) VALUES ($1)', [task]); // Insert the new task into the 'todos' table
        res.status(201).send('Todo added');                                // Respond with a success message
    } catch (error) {
        console.error('Error adding todo:', error.stack);                  // Log errors during the insert operation
        res.status(500).send('Error adding todo.');                        // Respond with an error status
    }
});

// Start the server
const startServer = () => {
    console.log(`Server is running on port http://localhost:${PORT}.`); // Log the server start message
};

app.listen(PORT, startServer); // Begin listening for requests on the defined port