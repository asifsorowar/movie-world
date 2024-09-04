import React from "react";
import MovieSlider, { SliderTypes } from "../common/MovieSlider";
import { useStateProvider } from "../../store/provider";

function UpcomingMovies() {
  const [{ upcomingMovies }] = useStateProvider();

  return (
    <div className="bg-black flex flex-col justify-center items-center py-9 w-full">
      <div className="header text-center">
        <div className="flex gap-1 font-bold text-4xl pb-3">
          <h3 className="text-blue-600">UPCOMING</h3>
          <h3 className="text-yellow-500">MOVIES</h3>
        </div>
        <p className="text-white text-md">We constantly offer new movies</p>
      </div>

      <div className="content w-full mt-10">
        <MovieSlider data={upcomingMovies} type={SliderTypes.upcoming} />
      </div>
    </div>
  );
}

export default UpcomingMovies;
