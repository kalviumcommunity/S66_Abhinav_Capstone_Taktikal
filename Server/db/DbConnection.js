const mongoose = require("mongoose");

const DbConnection = async () => {
    try {
        // Reuse existing connection (important for serverless cold/warm starts)
        if (mongoose.connection.readyState === 1) {
            return true;
        }

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI environment variable is missing.");
        }

        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10
        };

        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(mongoURI, options);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });

        return true;

    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        console.error('🛑 Database connection failure. Ensure your MongoDB Atlas URI and IP access rules are valid.');
        return false;
    }
};

module.exports = DbConnection;
