require('dotenv').config();
const routes = require('./routes/routes');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const user = require("./routes/user");
const donor = require("./routes/routes")
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.use("/donor",donor)
app.use("/user", user);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})