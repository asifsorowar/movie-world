import React from "react";
import MovieSlider, { SliderTypes } from "../common/MovieSlider";
import { useStateProvider } from "../../store/provider";

function UploadedMovies() {
  const [{ myUploadedMovies }] = useStateProvider();

  return (
    <div className="flex flex-col items-center py-11">
      <div className="header">
        <div className="flex gap-1 font-bold text-4xl">
          <h3 className="text-blue-600">MY ADDED</h3>
          <h3 className="text-yellow-500">MOVIES</h3>
        </div>
      </div>

      <div className="content w-full mt-10">
        <MovieSlider
          data={myUploadedMovies}
          type={SliderTypes.myListed}
          onClickInnerSlide={(movie, type) =>
            console.log("This is test::", movie, type)
          }
        />
      </div>
    </div>
  );
}

export default UploadedMovies;
