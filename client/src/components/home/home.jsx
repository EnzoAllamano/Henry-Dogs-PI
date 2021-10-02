import style from "./home.module.css";
import React from "react";
import Cards from "../cards/cards.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../actions";
import Details from "../details/details.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const dogsRedux = useSelector(state => state.dogs)
  useEffect(() => {
    dispatch(getAllDogs());
  }, []);


  return (
    dogsRedux[0].image ? (<div className={style.mainDiv}>
      <Cards></Cards>
    </div>
  ) : <div>Loading</div>)
}
