const express = require("express");
const app = express();
const morgan = require('morgan');

const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const movieRoutes = require("./routes/movie");

// server Apache console logger, will log basic information about requests
app.use(morgan('common'));
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/movies", movieRoutes);


app.get("/", (req, res) => {
  res.send("You hit the general GET route!");
});

app.post("/", (req, res) => {
  res.send("You hit the general POST route!");
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(8080, () => {
  console.log("listening to 8080");
});
