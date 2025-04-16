require("dotenv").config();
const express = require("express");
const DbConnection = require("./db/DbConnection");
DbConnection();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
