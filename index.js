require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const {executeTbl } = require("./config/index")
const cors = require("cors")

const routerAPI = require("./routes/index")

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);
executeTbl()

app.use(cors())

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
app.use("/assets", express.static("public/images/pengelola"))

app.use( routerAPI )

server.listen(PORT, () => {
   console.log(`Server has been running in http://localhost:${PORT}`);
});
