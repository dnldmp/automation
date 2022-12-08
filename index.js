const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const open = require("open");

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.post("/api", (req, res) => {
  const { link } = req.body;

  open(link);

  res.send("accepted");
});

app.listen(process.env.PORT || 5000);
