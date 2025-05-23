const mongoose = require("mongoose");
const DbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports = DbConnection;