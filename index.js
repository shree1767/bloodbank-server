require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const donorRoutes = require("./routes/routes");

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on('error', (error) => {
    console.error("Database connection error:", error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

app.use(`/donor`, donorRoutes);
app.use(`/user`, userRoutes);

// Listen on the appropriate port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
