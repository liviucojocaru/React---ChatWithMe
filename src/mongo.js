const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to MongoDB Atlas");
  const db = client.db();
  db.admin().listDatabases((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Databases:");
    console.log(result.databases);
    client.close();
  });
});
