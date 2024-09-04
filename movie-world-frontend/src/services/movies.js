import { getAuthUser } from "./auth";
import http from "./http";

const apiEndpoint = "/movies";

export const getUpcomingMovies = () => {
  return http.get(apiEndpoint + "?status=upcoming");
};

export const getReleasedMovies = () => {
  return http.get(apiEndpoint + "?status=released");
};

export const getAuthUploadedMovies = () => {
  return http.get(apiEndpoint + "/user/uploaded", {
    headers: {
      Authorization: getAuthUser(),
    },
  });
};

export const getMovie = (id) => {
  return http.put(apiEndpoint + "/" + id);
};

export default {
  getUpcomingMovies,
  getReleasedMovies,
  getMovie,
};
