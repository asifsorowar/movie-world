import React, { useEffect } from "react";
import { useStateProvider } from "../../store/provider";
import {
  getUpcomingMovies,
  getReleasedMovies,
  getAuthUploadedMovies,
} from "../../services/movies";
import { getMyRattedMovies } from "../../services/movieRating";
import { types } from "../../store/reducer";
import UpcomingMovies from "./UpcomingMovies";
import RatedMovies from "./RatedMovies";
import UploadedMovies from "./UploadedMovies";

function Home() {
  const [{}, dispatch] = useStateProvider();

  const loadMovies = async () => {
    const { data: upcomingMovies } = await getUpcomingMovies();
    const { data: releasedMovies } = await getReleasedMovies();
    const { data: myRattedMovies } = await getMyRattedMovies();
    const { data: myUploadedMovies } = await getAuthUploadedMovies();

    dispatch({
      type: types.load_movies,
      upcomingMovies,
      releasedMovies,
      myRattedMovies,
      myUploadedMovies,
    });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="w-screen">
      <UpcomingMovies />
      <div className="bg-black w-full flex flex-col justify-center items-center py-9">
        <div className="w-2/3">
          <RatedMovies />
          <UploadedMovies />
        </div>
      </div>
    </div>
  );
}

export default Home;
