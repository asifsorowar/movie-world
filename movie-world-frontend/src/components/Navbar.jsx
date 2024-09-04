import React from "react";
import { NavLink } from "react-router-dom";
import MovieSearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className="p-3 py-5 bg-black text-gray-200">
      <div className="flex justify-center items-center gap-5">
        <NavLink to={"/"}>Movie World</NavLink>
        <div className="w-1/3">
          <MovieSearchBar />
        </div>
        <NavLink className="text-yellow-400" to={"/get-pro"}>
          Get Pro
        </NavLink>
        <NavLink to={"/movies"}>Movies</NavLink>
        <NavLink to={"/watch-list"}>Watch list</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
