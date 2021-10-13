import React from "react";
import style from "./card.module.css";
import { useSelector } from "react-redux";
import Details from "../details/details";


export default function Card({dog}) {
  
  const darkMode = useSelector(state => state.darkMode)

  let colors =  darkMode ? ["#1D4B67", "#601313", "#4D1721", "#2D481E", "#1E361B", "#1C1B27", "#1E3A30",  "#62500F"] :
  ["#B5EAEA", "#FFBCBC", "#F38BA0", "#B1E693", "#6ECB63", "#6F69AC", "#95DAC1", "#FFEBA1"]
  function chooseTemperamentColor(t){
    return colors[t[0].charCodeAt() % colors.length] 
  }
  
  function generateTemperaments(temperaments = []){
    return temperaments.split(', ').slice(0,3).map(t =><li style={{backgroundColor: chooseTemperamentColor(t)}} key = {`${t} temperament`}>{t}</li>)
  }
    return (
    <div className={style.divBody}>
      <Details dog = {dog}/>
      <ul className = {style.ul}>
        {generateTemperaments(dog.temperament)}
      </ul>
    </div>
  );
}
