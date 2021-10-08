import React from "react";
import style from "./create.module.css";
import styleCards from "../home/home.module.css";

export default function Create() {
  function handleSubmit() {
    console.log("asdjkashd");
  }
  return (
    <form onSubmit={handleSubmit()} className={styleCards.mainDiv}>
      <div className={style.inputContainer}>
        <div>
          <label>Breed: </label> <input />
        </div>
        <div>
          <label>Heigth: </label> <input /> - <input />
        </div>
        <div>
          <label>Width: </label> <input /> - <input />
        </div>
        <div>
          <label>Life span: </label> <input /> - <input />
        </div>
        <button>¡CREATE!</button>
      </div>
    </form>
  );
}
