const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 8000;
require('dotenv').config()


// middware
app.use(cors())
app.use(express.json())


// travelers20



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lbnjpl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const travelersCollecttion = client.db('travelersCRUD').collection('travelers')
    await client.connect();


    // data
    app.get('/travelers',async(req,res)=>{
        const cursor = travelersCollecttion.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    //data show
    app.post('/travelers',async(req,res)=>{
        const newTravelers = req.body;
        console.log(newTravelers)
        const result = await travelersCollecttion.insertOne(newTravelers);
        res.send(result)
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
    res.send('assigment ten is running')
  })
  
  app.listen(port, () => {
    console.log(`assigment ten is running on port ${port}`)
  })