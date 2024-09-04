const express = require("express");
const router = express.Router();

const { Director, validate } = require("../models/Director");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let director = await Director.findOne({
    name: req.body.name,
    country: req.body.country,
    age: req.body.age,
    gender: req.body.gender,
  });
  if (director) return res.status(400).send("director already existed!");

  director = new Director(value);
  await director.save();

  return res.status(201).send(director);
});

module.exports = router;
