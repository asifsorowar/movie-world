const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const genres = require("../routers/genres");
const movies = require("../routers/movies");
const actors = require("../routers/actors");
const directors = require("../routers/directors");
const movieRatings = require("../routers/movieRatings");
const errors = require("../middleware/errors");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use("/api/genres", genres);
  app.use("/api/actors", actors);
  app.use("/api/directors", directors);
  app.use("/api/movies", movies);
  app.use("/api/movie-ratings", movieRatings);
  app.use(errors);
};
