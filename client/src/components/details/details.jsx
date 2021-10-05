import React from "react";
import style from "./details.module.css";
import DetailsModal from "../detailsModal/detailsModal";
import { useDispatch } from "react-redux";
import { deleteDogDetail, getDogDetail } from "../../actions";

export default function Details({ dog }) {
  const dispatch = useDispatch();

  async function loadDogDetails() {
    dispatch(deleteDogDetail());
    dispatch(getDogDetail(dog.id));
  }

  return (
    <details>
      <summary className={style.summary}>
        <div className={style.detailsModalOverlay}></div>
        <img alt = {`this is a ${dog.name}`} onClick={loadDogDetails} className={style.imgCard} src={dog.image.url} />
        <h1  onClick={loadDogDetails} className={style.h1DogName}>{dog.name}</h1>
      </summary>
      <DetailsModal></DetailsModal>
    </details>
  );
}
