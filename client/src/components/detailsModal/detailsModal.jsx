import React from "react";
import style from "./detailsModal.module.css";
import {useSelector } from "react-redux";
import Loading from "../loading/loading";

export default function DetailsModal() {
  let dog = useSelector((state) => state.dogDetail);

  return dog.image ? (
    <div class={style.detailsModal}>
      <div class={style.detailsModalTitle}>
        <h1>{dog.name}</h1>
      </div>
      <div className={style.advancedDetails}>
        <img className={style.imgDetails} src={dog.image.url} alt = {`this is a ${dog.name}`}></img>
        <ul className={style.ulAdvancedInfo}>
          <li key = "Weight">Weight {dog.weight.metric} Kg</li>
          <li key = "Height">Height {dog.height.metric} cm</li>
          <li key = "Life span">Life span {dog.life_span} years</li>
          <ul className={style.ul}>
            {dog.temperament.split(", ").map((t) => (
              <li key = {`temperament ${t}`}>{t}</li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  ) : (
    <Loading/>
  );
}
