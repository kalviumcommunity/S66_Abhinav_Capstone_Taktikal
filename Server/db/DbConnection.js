const mongoose = require("mongoose");

const DbConnection = async () => {
    try {
        // MongoDB connection options
        const options = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            retryWrites: true,
            w: 'majority'
        };

        console.log('Attempting to connect to MongoDB...');

        // Try to connect to MongoDB Atlas
        const conn = await mongoose.connect(process.env.mongoURI, options);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });

        return true;

    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);

        // Try alternative connection string format
        if (error.message.includes('querySrv')) {
            console.log('🔄 Trying alternative connection method...');
            try {
                // Remove the srv and try direct connection
                const directURI = process.env.mongoURI.replace('mongodb+srv://', 'mongodb://').replace('?retryWrites=true&w=majority&appName=Cluster100', '');
                const conn = await mongoose.connect(directURI, options);
                console.log(`✅ MongoDB Connected (direct): ${conn.connection.host}`);
                return true;
            } catch (directError) {
                console.error(`❌ Direct connection also failed: ${directError.message}`);
            }
        }

        console.log('⚠️  Server will continue without database connection...');
        console.log('📝 Note: Authentication and data persistence features will not work.');
        console.log('🔧 To fix: Check your internet connection and MongoDB Atlas cluster status.');

        return false;
    }
};

module.exports = DbConnection;