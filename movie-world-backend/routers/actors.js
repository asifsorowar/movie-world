const express = require("express");
const router = express.Router();

const { Actor, validate } = require("../models/Actor");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let actor = await Actor.findOne({
    name: req.body.name,
    country: req.body.country,
    age: req.body.age,
    gender: req.body.gender,
  });
  if (actor) return res.status(400).send("actor already existed!");

  actor = new Actor(value);
  await actor.save();

  return res.status(201).send(actor);
});

module.exports = router;
