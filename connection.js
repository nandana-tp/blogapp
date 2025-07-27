const mongoose = require("mongoose");


mongoose
  .connect("mongodb+srv://nandanatp7501:blog@cluster0.mdyogjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
