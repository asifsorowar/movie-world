export const initialState = {
  upcomingMovies: [],
  releasedMovies: [],
  myRattedMovies: [],
  myUploadedMovies: [],
};

export const types = {
  load_upcoming_movies: "LOAD_UPCOMING_MOVIES",
  load_released_movies: "LOAD_RELEASED_MOVIES",
  load_ratted_movies: "LOAD_MY_RATTED_MOVIES",
  load_movies: "LOAD_MOVIES",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.load_movies:
      return {
        ...state,
        upcomingMovies: action.upcomingMovies,
        releasedMovies: action.releasedMovies,
        myRattedMovies: action.myRattedMovies,
        myUploadedMovies: action.myUploadedMovies,
      };

    case types.load_upcoming_movies:
      return { ...state, upcomingMovies: action.upcomingMovies };

    case types.load_released_movies:
      return { ...state, releasedMovies: action.releasedMovies };

    case types.load_ratted_movies:
      return { ...state, myRattedMovies: action.myRattedMovies };

    default:
      return state;
  }
};
