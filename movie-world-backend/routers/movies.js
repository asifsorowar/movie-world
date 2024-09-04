const express = require("express");
const router = express.Router();

const { Movie, validate } = require("../models/Movie");
const validateId = require("../middleware/validateId");
const { MOVIE_STATUS } = require("../utils/constants");
const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  let { limit, status } = req.query;
  limit = limit ? parseInt(limit) : 20;
  status = status ?? MOVIE_STATUS.released;

  const movies = await Movie.find({ status })
    .populate("genre")
    .select(["averageRating", "title", "status", "poster"])
    .limit(limit);

  return res.status(200).send(movies);
});

router.get("/:id", [validateId], async (req, res) => {
  const movie = await Movie.findById(req.params.id)
    .populate("genre")
    .populate("creators")
    .populate("stars")
    .populate("topCasts");

  return res.status(200).send(movie);
});

router.post("/", [authorization], async (req, res) => {
  let { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = await Movie.findOne({ name: req.body.title });
  if (movie) return res.status(400).send("movie already existed!");

  movie = new Movie({
    title: value.title,
    genre: value.genreId,
    status: value.status,
    creators: value.creatorIds,
    stars: value.starIds,
    topCasts: value.topCastIds,
    description: value.description,
    poster: value.poster,
    uploadedBy: value.userId,
  });
  await movie.save();

  return res.status(201).send(movie);
});

router.get("/user/uploaded", [authorization], async (req, res) => {
  let { limit } = req.query;
  limit = limit ? parseInt(limit) : 20;

  const movies = await Movie.find({ uploadedBy: req.body.userId })
    .populate("genre")
    .select(["averageRating", "title", "status", "poster"])
    .limit(limit);

  return res.status(200).send(movies);
});

module.exports = router;
