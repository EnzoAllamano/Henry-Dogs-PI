// import React, { useEffect } from "react";
import Card from "../card/card.jsx";
import { useSelector } from "react-redux";
import style from "./cards.module.css";
// import * as actionCreators from "../../actions";
// import { useDispatch } from "react-redux";
// import store from "../../store/index.js";
import Loading from "../loading/loading.jsx";

export default function Cards() {
  const dogsRedux = useSelector((state) => state.dogsActualPage);

  const generateDogsCards = function () {
    return dogsRedux[0] && dogsRedux[0].loading ? <Loading></Loading> : dogsRedux.length ? (
      dogsRedux.map((d) => <Card dog={d} key={d.id} />)
    ) : <h1>There are no results</h1>
  };

  return (
      <ul className={style.ulContainer}>{generateDogsCards()}</ul>
  );
}
