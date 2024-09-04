import React from "react";
import Icon from "./common/Icon";

function MovieSearchBar() {
  return (
    <div className="bg-white rounded-lg px-4 pl-0 py-1 flex items-center">
      <div className="size-6 mr-2 pl-1 text-gray-500 flex items-center">
        <Icon name="search" />
      </div>
      <input
        className="outline-none border-transparent focus:border-transparent focus:ring-0 w-full"
        type="search"
        placeholder="Search movies"
      ></input>
    </div>
  );
}

export default MovieSearchBar;
