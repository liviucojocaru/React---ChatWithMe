require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const geoip = require("geoip-lite");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/location", (req, res) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  if (!geo) {
    res.status(400).json({ error: "Could not retrieve location data." });
    return;
  }
  res.json({ location: geo.country });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
