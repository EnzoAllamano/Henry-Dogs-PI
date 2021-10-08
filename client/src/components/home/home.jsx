import style from "./home.module.css";
import React from "react";
import Cards from "../cards/cards.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../actions";
import Pages from "../pages/pages";
import Filters from "../filter/filter";

export default function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllDogs());
  }, []);


  return (
    <div className={style.mainDiv}>
      <Filters></Filters>
      <Cards></Cards>
      <Pages></Pages>
    </div>
  )
}
