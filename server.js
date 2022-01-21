const express = require("express");
const app = express();
//npm run devStart

app.get("/", (req, res) => {
    console.log("hello");
    res.send("Welcome to Node JS, I am Express JS");
})

app.listen(3000);