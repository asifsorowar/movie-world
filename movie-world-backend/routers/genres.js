const express = require("express");
const router = express.Router();

const { Genre, validate } = require("../models/Genre");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findOne({ name: req.body.name });
  if (genre) return res.status(400).send("genre already existed!");

  genre = new Genre(value);
  await genre.save();

  return res.status(201).send(genre);
});

module.exports = router;
