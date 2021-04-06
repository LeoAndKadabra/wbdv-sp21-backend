const express = require("express");
const app = express();

// app.use(() => {
//   console.log("get a request");
// });

app.get("/", (req, res) => {
  res.send("You hit the get route!");
});

app.post("/", (req, res) => {
  res.send("You hit the post route!");
})

app.listen(8080, () => {
  console.log("listening to 8080");
});
