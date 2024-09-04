const mongoose = require("mongoose");
const Joi = require("joi");
const { MODELS, MOVIE_STATUS } = require("../utils/constants");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.Genre,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MOVIE_STATUS),
      required: true,
      default: MOVIE_STATUS.upcoming,
    },
    description: {
      type: String,
      required: true,
      minlength: 30,
    },
    creators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.Director,
        required: true,
      },
    ],
    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.Actor,
        required: true,
      },
    ],
    topCasts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.Actor,
        required: true,
      },
    ],
    poster: {
      type: String,
      required: true,
    },
    averageRating: { type: Number, min: 0, max: 10, default: 0 },
    totalRatings: { type: Number, min: 0, default: 0 },
    uploadedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

movieSchema.pre("remove", async function (next) {
  await this.model(MODELS.MovieRating).deleteMany({ movieId: this._id });
  return next();
});

const Movie = mongoose.model(MODELS.Movie, movieSchema);

const validate = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    genreId: Joi.objectId().required(),
    creatorIds: Joi.array().items(Joi.objectId()).required(),
    starIds: Joi.array().items(Joi.objectId()).required(),
    topCastIds: Joi.array().items(Joi.objectId()).required(),
    description: Joi.string().required().min(30),
    poster: Joi.string().required().min(3),
    userId: Joi.string().min(5).required(),
    status: Joi.string()
      .valid(...Object.values(MOVIE_STATUS))
      .default(MOVIE_STATUS.upcoming),
  });

  return schema.validate(movie);
};

module.exports.validate = validate;
module.exports.Movie = Movie;
