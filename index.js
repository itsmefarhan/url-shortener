const express = require("express");
const app = express();
const mongoose = require("mongoose");
const URL = require("./models/url");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/urlshortner", {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

app.get("/", async (req, res) => {
  const urls = await URL.find().select("-__v");
  res.render("index", { urls });
});

app.post("/shorten", async (req, res) => {
  let url = req.body.fullUrl;
  const record = new URL({
    full: url,
  });
  await record.save();
});

app.get("/:id", async (req, res) => {
  const shortId = req.params.id;
  const url = await URL.findOne({ short: shortId });
  url.clicks++;
  await url.save();
  res.redirect(url.full);
});

app.listen(5000, () => console.log("server is running on port 5000"));
