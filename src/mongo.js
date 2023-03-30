require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("Connecting to MongoDB Atlas...");
console.log("URI:", uri);

client.connect((err) => {
  if (err) {
    console.log("Error connecting to MongoDB Atlas:", err);
    return;
  }
  console.log("Connected to MongoDB Atlas");
  const db = client.db();
  db.admin().listDatabases((err, result) => {
    if (err) {
      console.log("Error listing databases:", err);
      return;
    }
    console.log("Databases:");
    console.table(result.databases);
    client.close();
    console.log("Connection closed");
  });
});
