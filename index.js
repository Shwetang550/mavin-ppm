const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// routes
const formRoutes = require("./routes/form");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    allowedHeaders: "X-Requested-With, Content-Type, auth-token"
}));
app.use("/api/form", formRoutes);

const port = process.env.PORT || 5000;

// localhost-mongodb-connection-string: mongodb://localhost:27017/form
// shwetang-mongodb-atlas-connection-url: mongodb+srv://shwetangsingh:tpUaxdceEAQGEUK6@cluster0.qfsnwdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose 
    .connect("mongodb+srv://shwetangsingh:tpUaxdceEAQGEUK6@cluster0.qfsnwdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>
        app.listen(port, () => console.log(`Listening at port ${port}...`))
    )
    .catch((err) => console.log(err?.message));
