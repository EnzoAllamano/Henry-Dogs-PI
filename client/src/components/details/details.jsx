import React from "react";
import style from "./details.module.css";

export default function Details({ dog }) {
  return (
    <details>
      <summary className={style.summary}>
        <div class={style.detailsModalOverlay}></div>
        <img
          className={style.img}
          src={dog.image.url}
        />
        <h1>{dog.name}</h1>
      </summary>
      <div class={style.detailsModal}>
        <div class={style.detailsModalTitle}>
          <h1>{dog.name}</h1>
        </div>
        <div className = {style.advancedDetails}>
        <img className={style.img} src = {dog.image.url}></img>
        <ul>
          <li>Weight {dog.weight.metric} Kg</li>
          <li>Height {dog.height.metric} cm</li>
          <li>Life span {dog.life_span} years</li>
        <ul className = {style.ul}>
        {dog.temperament.split(', ').map(t =><li>{t}</li>)}
      </ul>
        </ul>
        </div>
        <div class={style.detailsModalContent}>Descripcion</div>
      </div>
    </details>
  );
}
