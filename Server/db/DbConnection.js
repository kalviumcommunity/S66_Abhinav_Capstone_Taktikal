const mongoose = require("mongoose");

const DbConnection = async () => {
    try {
        // 1 = connected, 2 = connecting
        if (mongoose.connection.readyState === 1) {
            return true;
        }
        if (mongoose.connection.readyState === 2) {
            await new Promise((resolve, reject) => {
                const onConnected = () => {
                    cleanup();
                    resolve();
                };
                const onError = (err) => {
                    cleanup();
                    reject(err);
                };
                const cleanup = () => {
                    mongoose.connection.off('connected', onConnected);
                    mongoose.connection.off('error', onError);
                };
                mongoose.connection.once('connected', onConnected);
                mongoose.connection.once('error', onError);
            });
            return mongoose.connection.readyState === 1;
        }

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI environment variable is missing.");
        }

        // Common Render mistake: pasting URI wrapped in quotes
        const cleanedURI = mongoURI.trim().replace(/^['"]|['"]$/g, '');

        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10
        };

        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(cleanedURI, options);
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
