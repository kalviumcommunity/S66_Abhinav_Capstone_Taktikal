require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DbConnection = require("./db/DbConnection");

// Routes importing
const authRoutes = require("./routes/authRoutes");
const athleteRoutes = require("./routes/athleteRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

// Database connection
DbConnection();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/performance', performanceRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Taktikal Server is running!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            athletes: '/api/athletes',
            performance: '/api/performance',
            health: '/api/health'
        }
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
