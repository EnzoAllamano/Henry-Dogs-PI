// import React, { useEffect } from "react";
import Card from "../eachCard/card.jsx";
import { useSelector } from "react-redux";
import style from "./cards.module.css";
// import * as actionCreators from "../../actions";
// import { useDispatch } from "react-redux";
// import store from "../../store/index.js";

export default function Cards() {
  const dogsRedux = useSelector((state) => state.actPage);

  const generateDogsCards = function () {
    return (
      dogsRedux ? (
        dogsRedux.map((d) => <Card dog={d} />)
      ) : (
        <p>There's no dogs to show</p>
      )
    );
  };

  return (
    <div className={style.divContainer}>
      <ul className= {style.ulContainer}>{generateDogsCards()}</ul>
    </div>
  );
}
