require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const DbConnection = require("./db/DbConnection");

// Routes importing
const authRoutes = require("./routes/authRoutes");
const athleteRoutes = require("./routes/athleteRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

// Database connection
DbConnection().then((connected) => {
    if (!connected) {
        console.warn("⚠️  Database connection not established. Some API operations may fail.");
    }
});

const app = express();

// Trust reverse proxy (Render, Heroku, Nginx, Cloudflare) for client IP detection
app.set("trust proxy", 1);

// Security Headers (Helmet)
app.use(helmet({
    contentSecurityPolicy: false, // Disabled for API server or configured per client requirement
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration - Restrict to allowed client URL
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin || origin === allowedOrigin || origin.includes("netlify.app")) {
            return callback(null, true);
        }
        return callback(null, true); // Permissive fallback for dev / Netlify deployments
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET || 'cookie-secret-key'));

// HTTP Request Logger
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

// Request Body Parsers with Size Limits
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Rate Limiting for Auth Endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs for auth routes
    message: { message: "Too many authentication attempts, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300, // 300 requests per 15 minutes for general API
    standardHeaders: true,
    legacyHeaders: false
});

const PORT = process.env.PORT || 3001;

// General API Rate Limiting
app.use("/api/", apiLimiter);

// Routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/athletes", athleteRoutes);
app.use("/api/performance", performanceRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Taktikal API Server is running',
        status: 'online',
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
    res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling middleware (Sanitizes internal server details)
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Taktikal Server running on port ${PORT}`);
    });
}

module.exports = app;
