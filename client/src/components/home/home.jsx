import style from "./home.module.css";
import React from "react";
import Cards from "../cards/cards.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, []);

  return (
    <div className={style.mainDiv}>
      <h1>Hola todo esto es un home</h1>
      <h1>Hola esto de abajo es una card</h1>
      <Cards></Cards>
    </div>
  );
}
