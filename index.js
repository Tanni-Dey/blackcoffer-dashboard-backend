const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1tyqf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const dataCollection = client.db("jobtask").collection("blackdata");

    //all data show api
    app.get("/datas", async (req, res) => {
      const query = {};
      const cursor = dataCollection.find(query);
      const allData = await cursor.toArray();
      res.send(allData);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Blackcoffer");
});

app.listen(port, () => {
  console.log("Blackcoffer Connected", port);
});
