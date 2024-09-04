const mongoose = require("mongoose");
const Joi = require("joi");
const { MODELS, GENDER } = require("../utils/constants");

const ActorSchema = new mongoose.Schema(
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

const Actor = mongoose.model(MODELS.Actor, ActorSchema);

const validate = (actor) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    profileImage: Joi.string().min(3),
    country: Joi.string().required().min(3),
    gender: Joi.string().valid(...Object.values(GENDER)),
    age: Joi.number().min(1).max(200).required(),
  });

  return schema.validate(actor);
};

module.exports.validate = validate;
module.exports.Actor = Actor;
