import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";

const blogPosts = [
  {
    title: "Travel the world!!!!!",
    category: "Travel",
    image: "https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg",
  },
  {
    title: "Art!!!!!!!!!!!!!!",
    category: "Art",
    image: "https://t3.ftcdn.net/jpg/02/73/22/74/360_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg",
  },
  {
    title: "Food is Art!!!!",
    category: "Food",
    image: "https://media.istockphoto.com/id/1457979959/photo/snack-junk-fast-food-on-table-in-restaurant-soup-sauce-ornament-grill-hamburger-french-fries.jpg?s=612x612&w=0&k=20&c=QbFk2SfDb-7oK5Wo9dKmzFGNoi-h8HVEdOYWZbIjffo=",
  },
];
useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then((res) => {
        setBlogPosts(res.data); // Assuming res.data is an array of blog objects
      })
      .catch((err) => {
        console.error("Error fetching blogs", err);
      });
  }, []);

  // Delete handler (optional enhancement)
  const deleteBlog = (id) => {
    axios.delete("http://localhost:3001/delete/${id}")
      .then(() => {
        setBlogPosts((prev) => prev.filter((blog) => blog._id !== id));
      });
  };


export default function Home() {
  return (
    <div>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#9c27b0" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            BlogApp
          </Typography>
          <Box>
            <Button color="inherit">HOME</Button>
            <Button color="inherit">ADD</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Blog Cards */}
      <Box p={3}>
        <Grid container spacing={4} justifyContent="center">
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={7} md={5} lg={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    {post.category}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
                  >
                    DELETE
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
                  >
                    UPDATE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}