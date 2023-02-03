require("dotenv").config();
const express = require("express");
const app = express();
const axios=require("axios");
const cors = require("cors");
const port =process.env.PORT || 3001;
app.use(
  cors({
    origin: [
      "https://www.google.com/",
      `${process.env.FRONTEND_URL}`,
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/city",require("./routes/weather.js"));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => console.log("Listening on port 3001"));


module.exports = app;
