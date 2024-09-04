const Joi = require("joi");
const mongoose = require("mongoose");
const { MODELS } = require("../utils/constants");

const movieRatingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.Movie,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      minlength: 5,
    },
    rating: { type: Number, min: 1, max: 10, required: true },
    review: String,
  },
  { timestamps: true }
);

movieRatingSchema.post("save", async function () {
  const result = await this.model(MODELS.MovieRating).aggregate([
    { $match: { movie: this.movie } },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  const newAverage = result.length > 0 ? result[0].average : 0;
  const totalRatings = result.length > 0 ? result[0].totalRatings : 0;

  await this.model(MODELS.Movie).findByIdAndUpdate(this.movie, {
    averageRating: newAverage,
    totalRatings,
  });
});

const MovieRating = mongoose.model(MODELS.MovieRating, movieRatingSchema);

const validate = (rating) => {
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
    userId: Joi.string().min(5).required(),
    rating: Joi.number().min(1).max(10).required(),
    review: Joi.string().min(5).max(255),
  });

  return schema.validate(rating);
};

exports.MovieRating = MovieRating;
exports.validate = validate;
