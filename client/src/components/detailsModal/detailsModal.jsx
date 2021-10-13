import React from "react";
import style from "./detailsModal.module.css";
import {useSelector } from "react-redux";
import Loading from "../loading/loading";

export default function DetailsModal() {
  let dog = useSelector((state) => state.dogDetail);
  let darkMode = useSelector(state => state.darkMode)

  let colors =  darkMode ? ["#1D4B67", "#601313", "#4D1721", "#2D481E", "#1E361B", "#1C1B27", "#1E3A30",  "#62500F"] :
  ["#B5EAEA", "#FFBCBC", "#F38BA0", "#B1E693", "#6ECB63", "#6F69AC", "#95DAC1", "#FFEBA1"]
  function chooseTemperamentColor(t){
    return colors[t[0].charCodeAt() % colors.length] 
  }
  
  return dog.image ? (
    <div class={style.detailsModal}>
      <div class={style.detailsModalTitle}>
        <h1>{dog.name}</h1>
      </div>
      <div className={style.advancedDetails}>
        <img className={style.imgDetails} src={dog.image.url} alt = {`this is a ${dog.name}`}></img>
        <ul className={style.ulAdvancedInfo}>
          <li key = "Weight">Weight: {dog.weight.imperial} Kg</li>
          <li key = "Height">Height: {dog.height.imperial} cm</li>
          {dog.life_span ? <li key = "Life span">Life span: {dog.life_span} years</li>: undefined}
          {dog.bred_for ? <li key = "Breed for">Breed for: {dog.bred_for}</li> : undefined}
          {dog.breed_group ? <li key = "Breed group">Breed group: {dog.breed_group}</li> : undefined}
          {dog.origin ? <li key = "Origin">Origin: {dog.origin}</li> : undefined}
          <ul className={style.ul}>
            {dog.temperament ? dog.temperament.split(", ").map((t) => (
              <li style={{backgroundColor: chooseTemperamentColor(t)}} key = {`temperament ${t}`}>{t}</li>
            )): <li>Dog</li>}
          </ul>
        </ul>
      </div>
    </div>
  ) : (
    <Loading/>
  );
}
