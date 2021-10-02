import React from "react";
import style from "./card.module.css";
import Details from "../details/details";

export default function Card({dog}) {
    return (
    <div className={style.divBody}>
      <Details dog = {dog}/>
      <ul className = {style.ul}>
        {dog.temperament.split(', ').map(t =><li>{t}</li>)}
      </ul>
    </div>
  );
}
