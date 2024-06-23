require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const videosdetails = require("./routes/videos")
const port = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
  
app.use("/",videosdetails)

app.use(express.static("./public/images"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
