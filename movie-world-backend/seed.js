const { Genre } = require("./models/Genre");
const { Director } = require("./models/Director");
const { Actor } = require("./models/Actor");
const { Movie } = require("./models/Movie");
const { MovieRating } = require("./models/MovieRating");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

let genres = [
  {
    name: "Comedy",
  },
  {
    name: "Action",
  },
  {
    name: "Romance",
  },
  {
    name: "Thriller",
  },
];

let directors = [
  {
    name: "Test-1",
    country: "india",
    gender: "male",
    age: 25,
  },
  {
    name: "Test-2",
    country: "bangladesh",
    gender: "male",
    age: 50,
  },
  {
    name: "Test-3",
    country: "nepal",
    gender: "female",
    age: 45,
  },
  {
    name: "Test-4",
    country: "bhutan",
    gender: "male",
    age: 40,
  },
];

let actors = [
  {
    name: "actor-1",
    country: "india",
    gender: "male",
    age: 25,
  },
  {
    name: "actor-2",
    country: "bangladesh",
    gender: "male",
    age: 50,
  },
  {
    name: "actor-3",
    country: "nepal",
    gender: "female",
    age: 45,
  },
  {
    name: "actor-4",
    country: "bhutan",
    gender: "male",
    age: 40,
  },
];

let movies = [
  {
    title: "Raayan",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200/300",
    uploadedBy: "test-user-1",
  },
  {
    title: "Monster",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200/300",
    uploadedBy: "test-user-1",
  },
  {
    title: "Something new",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-1",
  },
  {
    title: "Captain miller",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-2",
  },
  {
    title: "Future-1",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200/300",
    uploadedBy: "test-user-3",
  },
  {
    title: "Future-2",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-4",
  },
  {
    title: "Future-4",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-5",
  },
  {
    title: "Future-5",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-5",
  },
  {
    title: "Future-6",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-5",
  },
  {
    title: "Future-7",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-5",
  },
  {
    title: "Shaitaan-1",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200",
    uploadedBy: "test-user-6",
  },
  {
    title: "Shaitaan-2",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200/300",
    uploadedBy: "test-user-7",
  },
  {
    title: "Shaitaan-3",
    status: "released",
    description:
      "this a full description of this movie. please visit google for better description of this movie.",
    poster: "https://picsum.photos/200/300",
    uploadedBy: "test-user-7",
  },
];

let movieRatings = [
  { userId: "test-user-1", rating: 4 },
  { userId: "test-user-1", rating: 5 },
  { userId: "test-user-1", rating: 6 },
  { userId: "test-user-1", rating: 7 },
  { userId: "test-user-1", rating: 8 },
  { userId: "test-user-1", rating: 2 },
  { userId: "test-user-1", rating: 3 },
];

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

async function seed() {
  await mongoose.connect(process.env.DB);

  await Genre.deleteMany({});
  await Director.deleteMany({});
  await Actor.deleteMany({});
  await Movie.deleteMany({});
  await MovieRating.deleteMany({});

  genres = await Genre.insertMany(genres);
  directors = await Director.insertMany(directors);
  actors = await Actor.insertMany(actors);

  movies = movies.map((movie) => ({
    ...movie,
    genre: genres[getRandomIndex(genres.length)]._id,
    creators: [
      directors[getRandomIndex(directors.length)]._id,
      directors[getRandomIndex(directors.length)]._id,
    ],
    stars: [
      actors[getRandomIndex(actors.length)],
      actors[getRandomIndex(actors.length)],
    ],
    topCasts: [...actors.map((actor) => actor._id)],
  }));
  movies = await Movie.insertMany(movies);

  for (let movie of movies) {
    if (movie.status === "upcoming") continue;

    const rating = new MovieRating({
      ...movieRatings[getRandomIndex(movieRatings.length)],
      movie: movie._id,
    });

    await rating.save();
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
