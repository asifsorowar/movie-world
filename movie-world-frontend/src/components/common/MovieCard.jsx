import React from "react";
import Button, { buttonColors } from "./Button";
import Icon from "./Icon";

export const InnerClickType = {
  default: "default",
  watchList: "watch-list",
  edit: "edit",
};

export const SliderTypes = {
  upcoming: "upcoming",
  myListed: "myListed",
};

const MovieCard = ({ movie, type, onClickInnerSlide }) => {
  return (
    <div className="rounded-lg overflow-hidden relative text-center flex flex-col w-full h-full">
      {type === SliderTypes.upcoming ? (
        <div>
          <img
            className="object-fill object-center block h-[350px] w-[300px]"
            src={movie.poster}
            alt=""
            onClick={() => onClickInnerSlide(movie, InnerClickType.default)}
          />
          <p className="text-white p-3 py-5 absolute bottom-0 w-full backdrop-blur-sm truncate">
            {movie.title}
          </p>
        </div>
      ) : type === SliderTypes.myListed ? (
        <div className="relative">
          <div className="absolute right-3 top-3">
            <Button
              color={buttonColors.blueGradient}
              onClick={() => onClickInnerSlide(movie, InnerClickType.edit)}
            >
              Edit Movie
            </Button>
          </div>
          <img
            className="object-fill object-center block h-[250px] w-[350px]"
            src={movie.poster}
            alt=""
            onClick={() => onClickInnerSlide(movie, InnerClickType.default)}
          />
        </div>
      ) : (
        <div className="text-left">
          <img
            className="object-fill object-center block h-[200px] w-full"
            src={movie.poster}
            alt=""
            onClick={() => onClickInnerSlide(movie, InnerClickType.default)}
          />
          <div className="text-white bg-gray-900 py-5 px-3">
            <p className="text-white text-lg font-bold pb-3">{movie.title}</p>
            <div className="flex gap-1 items-center pb-2">
              <div className="size-4 text-yellow-500">
                <Icon name="starFilled" />
              </div>
              <p>{movie.averageRating.toFixed(2)}</p>
            </div>
            <Button
              color={buttonColors.blueGradient}
              icon={
                <div className="size-5">
                  <Icon name="plus" />
                </div>
              }
              onClick={() => onClickInnerSlide(movie, InnerClickType.watchList)}
            >
              Watch List
            </Button>
            <div className="flex items-center">
              <div className="size-5 flex items-center justify-center mt-2">
                <Icon name="play" />
              </div>
              <p className="pt-2 pl-1">Trailer</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
