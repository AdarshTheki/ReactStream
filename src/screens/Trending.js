import React, { useState } from "react";
import requests from "../request";
import Rows from "../Components/Rows";
import { NavLink } from "react-router-dom";

const Trending = () => {
  const [date, setDate] = useState("day");
  const [show, setShow] = useState("movie");

  return (
    <div className='trending'>
      <div className='trending__setting'>
        <h1 className='trending__title'>trending</h1>
        <div className='trending__buttons'>
          <button
            onClick={() => setDate("day")}
            className={`trending__btn ${date === "day" && "isActive"}`}>
            Today
          </button>
          <button onClick={() => setDate("week")} className={`trending__btn ${date === "week" && "isActive"}`}>
            Week
          </button>
          <button onClick={() => setShow("movie")} className={`trending__btn ${show === "movie" && "isActive"}`}>
            movie
          </button>
          <button onClick={() => setShow("tv")} className={`trending__btn ${show === "tv" && "isActive"}`}>
            TV
          </button>
        </div>
      </div>
      <Rows
        fetchUrl={`/trending/${show}/${date}` + requests.api_link}
        show={show}
      />
    </div>
  );
};

export default Trending;