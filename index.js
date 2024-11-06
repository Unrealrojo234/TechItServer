require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const Blogs = require("./Blogs/myblogs"); //My Blogs Schema
const params = require("express-params");

//Getting environment variables
const port = process.env.PORT;
const uri = process.env.MONGODB_STRING;

//Setting up express middlewares
app.use(cors()); //Enables API access from any endpoint
app.use(express.json());

//Getting data from api tests
app.get("/", (req, res) => {
  res.send("<h1 style='text-align:center'>Tech It Server</h1>");
});

//Posting data to the database
app.post("/posts", async (req, res) => {
  try {
    const blogs = await Blogs.create(req.body);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Getting all Data from the databse
app.get("/posts", async (req, res) => {
  try {
    const blogs = await Blogs.find({});

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("A server error occurred");
  }
});

//Getting data for one post by id
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const blogs = await Blogs.findById(id);

    res.status(200).json(blogs);
  } catch (error) {
    res.send(error);
  }
});

//Deleting Data from databse
app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const blogs = await Blogs.findByIdAndDelete(id);

    res.status(200).send("Blog Deleted Successfully");
  } catch (error) {
    if (req.status(404)) {
      res.send("Blog not found");
    } else {
      res.send("Internal server error");
    }
  }
});

//Updating a Blog
app.put("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const blogs = await Blogs.findByIdAndUpdate(id);

    res.status(200).send(blogs);
  } catch (error) {
    res.send("Error, ", error);
  }
});

//Starting server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.log("Error ", error);
  });
