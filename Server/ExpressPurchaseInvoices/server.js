const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//mongoose
const mongoose = require('mongoose');

//port
const PORT = 4004;

//middle wares
app.use(cors());
app.use(bodyParser.json());

// app.listen(PORT, () => {
//     console.log("Server is running on port: " + PORT);
// });

mongoose.connect('mongodb+srv://asiri:asiri123@cluster0-lok9v.mongodb.net/procurementDB?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo db is running");
});