import React from "react";
import MovieSlider from "../common/MovieSlider";
import { useStateProvider } from "../../store/provider";

function RattedMovies() {
  const [{ myRattedMovies }] = useStateProvider();

  return (
    <div className="flex flex-col items-center">
      <div className="header">
        <div className="flex gap-1 font-bold text-4xl">
          <h3 className="text-yellow-500">MOVIES YOU</h3>
          <h3 className="text-blue-600">RATTED</h3>
        </div>
      </div>

      <div className="content w-full mt-10">
        <MovieSlider
          data={myRattedMovies.map((ratted) => ratted.movie)}
          navigation={true}
          onClickInnerSlide={(movie, type) =>
            console.log("This is test::", movie, type)
          }
        />
      </div>
    </div>
  );
}

export default RattedMovies;
