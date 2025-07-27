const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");
const connection = require("./connection");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());


// Routes

// Create blog
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("POST /add error:", error);
    res.status(500).send("Error adding blog");
  }
});

// Read all blogs
app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching blogs");
  }
});

// Update blog
app.put("/update/:id", async (req, res) => {
  try {
    const { title, category, image } = req.body;
    await BlogModel.findByIdAndUpdate(req.params.id, { title, category, image });
    res.send("Blog updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating blog");
  }
});

// Delete blog

app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send("Blog deleted");
  } catch (error) {
    res.status(500).send("Error deleting blog");
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
