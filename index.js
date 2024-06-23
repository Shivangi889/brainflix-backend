require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const videosdetails = require("./routes/videos")
const port = process.env.PORT;

const allowedOrigins = ['https://app.netlify.com', 'https://chic-tulumba-33a046.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());
  
app.use("/",videosdetails)

app.use(express.static("./public/images"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
