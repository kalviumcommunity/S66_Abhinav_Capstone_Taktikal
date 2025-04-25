require("dotenv").config();
const express = require("express");
const DbConnection = require("./db/DbConnection");

//Routes importing
const coachRoutes = require("./routes/coachRoutes");
const athleteRoutes = require("./routes/athleteRoutes");

DbConnection();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

//Routes
app.use("/api/coaches", coachRoutes);
app.use('/api/athletes', athleteRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
