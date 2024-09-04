const mongoose = require("mongoose");
const Joi = require("joi");
const { MODELS } = require("../utils/constants");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model(MODELS.Genre, genreSchema);

const validate = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
};

module.exports.Genre = Genre;
module.exports.validate = validate;
