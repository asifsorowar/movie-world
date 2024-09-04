import http from "./http";
import { getAuthUser } from "./auth";

const apiEndpoint = "/movie-ratings";

export const getMyRattedMovies = () => {
  return http.get(apiEndpoint, {
    headers: {
      Authorization: getAuthUser(),
    },
  });
};

export default {
  getMyRattedMovies,
};
