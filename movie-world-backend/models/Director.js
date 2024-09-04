const mongoose = require("mongoose");
const Joi = require("joi");
const { MODELS, GENDER } = require("../utils/constants");

const DirectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 200,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Director = mongoose.model(MODELS.Director, DirectorSchema);

const validate = (director) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    profileImage: Joi.string().min(3),
    country: Joi.string().required().min(3),
    gender: Joi.string().valid(...Object.values(GENDER)),
    age: Joi.number().min(1).max(200).required(),
  });

  return schema.validate(director);
};

module.exports.validate = validate;
module.exports.Director = Director;
