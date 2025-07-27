import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setBlogPosts(res.data))
      .catch((err) => console.error("Error fetching blogs", err));
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setBlogPosts((prev) => prev.filter((blog) => blog._id !== id));
        showSnackbar("Deleted successfully!");
      })
      .catch((err) => console.error("Error deleting blog", err));
  };

  const openUpdateDialog = (blog) => {
    setSelectedBlog({ ...blog });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedBlog(null);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/update/${selectedBlog._id}`, selectedBlog)
      .then(() => {
        fetchBlogs();
        handleDialogClose();
        showSnackbar("Updated successfully!");
      })
      .catch((err) => console.error("Error updating blog", err));
  };

  const showSnackbar = (message) => {
    setSnackbarMsg(message);
    setSnackbarOpen(true);
  };

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
            <Button color="inherit" onClick={() => navigate("/add")}>
              ADD
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Blog Cards */}
      <Box p={3}>
        <Grid container spacing={3} justifyContent="center">
          {blogPosts.map((post) => (
            <Grid item xs={12} sm={7} md={6} lg={5} key={post._id} id={post._id}>
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
                  image={
                    post.image?.trim()
                      ? post.image
                      : "https://via.placeholder.com/400x280?text=No+Image"
                  }
                  alt={post.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x280?text=Image+Not+Found";
                  }}
                />
                <CardContent>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                  >
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
                    onClick={() => deleteBlog(post._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
                    onClick={() => openUpdateDialog(post)}
                  >
                    UPDATE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar for success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={selectedBlog?.title || ""}
            onChange={(e) =>
              setSelectedBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Category"
            value={selectedBlog?.category || ""}
            onChange={(e) =>
              setSelectedBlog((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Image URL"
            value={selectedBlog?.image || ""}
            onChange={(e) =>
              setSelectedBlog((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
