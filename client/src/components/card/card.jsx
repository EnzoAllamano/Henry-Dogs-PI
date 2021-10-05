import React from "react";
import style from "./card.module.css";
import Details from "../details/details";

function chooseTemperamentColor(t){
  if(t[0].toUpperCase() < "G" && t[0].toUpperCase() >= "A") return "#ff6961" //Rojo
  else if(t[0].toUpperCase() >= "G" && t[0].toUpperCase() < "N") return "fdfd96" // Rosa
  else if(t[0].toUpperCase() >= "N" && t[0].toUpperCase() < "U") return "#84b6f4" //Verde 
  else if(t[0].toUpperCase() >= "U" && t[0].toUpperCase() <= "Z") return "#fdcae1" // 
else return "#ffffff"
}

export default function Card({dog}) {
    return (
    <div className={style.divBody}>
      <Details dog = {dog}/>
      <ul className = {style.ul}>
        {dog.temperament.split(', ').slice(0,3).map(t =><li style={{backgroundColor: chooseTemperamentColor(t)}} key = {`${t} temperament`}>{t}</li>)}
      </ul>
    </div>
  );
}
