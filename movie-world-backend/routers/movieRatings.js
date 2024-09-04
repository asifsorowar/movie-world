const express = require("express");
const router = express.Router();

const { Movie } = require("../models/Movie");
const { MovieRating, validate } = require("../models/MovieRating");
const { MOVIE_STATUS } = require("../utils/constants");
const authorization = require("../middleware/authorization");

router.get("/", [authorization], async (req, res) => {
  let { limit } = req.query;
  limit = limit ? parseInt(limit) : 20;

  const movieRatings = await MovieRating.find({
    userId: req.headers.authorization,
  })
    .populate("movie")
    .limit(limit);

  return res.status(200).send(movieRatings);
});

router.post("/", [authorization], async (req, res) => {
  let { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = await Movie.findById(req.body.movieId).select("_id");
  if (!movie) return res.status(400).send("invalid movieId!");
  if (movie.status === MOVIE_STATUS.upcoming)
    return res.status(400).send("invalid request!");

  let rating = await MovieRating.findOne({
    userId: req.body.userId,
    movie: req.body.movieId,
  }).select("_id");
  if (rating) return res.status(400).send("already reviewed!");

  rating = new MovieRating({
    movie: value.movieId,
    rating: value.rating,
    review: value.review,
    userId: req.body.userId,
  });
  await rating.save();

  return res.status(201).send(rating);
});

module.exports = router;
