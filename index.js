const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// s1uZMzeJP4EJlVrh
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b6dpetz.mongodb.net/?retryWrites=true&w=majority`;

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
    const bookingCollection = client.db("userService").collection("bookings");

  app.post('/users',async(req,res)=>{
      const user=req.body;
      console.log("user", user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);

  })
  // Booking

  app.post('/bookings',async(req,res)=>{
    const user=req.body;
    console.log("user", user);
    const result = await bookingCollection.insertOne(user);
    console.log(result);
    res.send(result);

})
  app.get('/users',async(req,res)=>{
    const cursor=userCollection.find()
    const result=await cursor.toArray();
    res.send(result);
  })
  app.get(`/users/:id`,async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    console.log(query);
    const result = await userCollection.findOne(query);
    res.send(result);
})

   // delete single user
   app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    const query = {
      _id: new ObjectId(id),
    };
    const result = await userCollection.deleteOne(query);
    console.log(result);
    res.send(result);
  });
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