const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express()


app.use(cors());
app.use(express.json());

const port = 5000
// s1uZMzeJP4EJlVrh

const uri = "mongodb+srv://moincse022:s1uZMzeJP4EJlVrh@cluster0.b6dpetz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("userService").collection("service");

  app.post('/users',async(req,res)=>{
      const user=req.body;
      console.log("user", user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);

  })
  app.get('/users',async(req,res)=>{
    const cursor=userCollection.find()
    const result=await cursor.toArray();
    res.send(result);
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})