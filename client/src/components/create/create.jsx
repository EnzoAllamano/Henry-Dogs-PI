import React from "react";
import style from "./create.module.css";
import styleCards from "../home/home.module.css";
import { useState } from "react";
import Temperaments from '../temperaments/temperaments.jsx'
import Card from '../card/card.jsx'

export default function Create() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  const [state, setState] = useState({
    breed: "",
    minW: "",
    maxW: "",
    minH: "",
    maxH: "",
    bredF: "",
    origin: "",
    url: "",
  });
  const [errors, setErrors] = useState({
    breed: "",
    weight: "",
    height: "",
    url: "",
  });

  function handleOnChange(e) {
    let value = e.target.value;
    switch (e.target.name) {
      case "breed": {
        if (value === "") setErrors({ breed: "Breed Name cannot be empty" });
        else if (value.match(/([0-9])+/))
          setErrors({ breed: "Breed Name cannot contain numbers" });
        else if (value.length > 35)
          setErrors({
            breed: "Breed Name cannot exceed 35 caracters",
          });
        else setErrors({ breed: undefined });
        break;
      }

      case "minW": {
        if (value === "") setErrors({ weight: "Min weight cannot be empty" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({ weight: "Weight cannot have not numeric characters" });
        else if (value <= 0)
          setErrors({ weight: "Min weight cannot be 0 or lower" });
        else if (value > 500)
          setErrors({ weight: "Min weight value is too high!" });
        else setErrors({ weight: undefined });
        break;
      }

      case "maxW": {
        if (value === "") setErrors({ weight: "Max weight cannot be empty" });
        else if (value <= 0)
          setErrors({ weight: "Max weight cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({ weight: "Weight cannot have not numeric characters" });
        else if (value > 500)
          setErrors({ weight: "Max weight value is too high!" });
        else if (value < state.minW)
          setErrors({
            weight: "Max weight should be lower than Min weight",
          });
        else setErrors({ weight: undefined });
        break;
      }

      case "minH": {
        if (value === "") setErrors({ height: "Min height cannot be empty" });
        else if (value <= 0)
          setErrors({ height: "Min height cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({ height: "Height cannot have not numeric characters" });
        else setErrors({ height: undefined });
        break;
      }

      case "maxH": {
        if (value === "") setErrors({ height: "Max height cannot be empty" });
        else if (value <= 0)
          setErrors({ height: "Max height cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({ height: "Height cannot have not numeric characters" });
        else if (value < state.minH)
          setErrors({
            height: "Max height should be lower than Min weight",
          });
        else setErrors({ height: undefined });
        break;
      }

      case "url": {
        if (value === "") setErrors({ url: "Image shouldn't be empty" });
        else setErrors({ url: undefined });
        break;
      }
    }
    setState({ ...state, [e.target.name]: e.target.value });
  }

function onTempSelected(temp){
  console.log(temp)
}

  return (
    <form onSubmit={handleSubmit} className={styleCards.mainDiv}>
      <div className={style.inputContainer}>
        <input
          value={state.breed}
          placeholder="Breed"
          name="breed"
          onChange={handleOnChange}
          value={state.breed}
        />
        <p className={errors.breed ? style.danger : style.none}>
          {errors.breed}
        </p>
        <div>
          <input
            onChange={handleOnChange}
            value={state.minW}
            name="minW"
            placeholder="Min weight"
            className={style.short}
          />{" "}
          -{" "}
          <input
            onChange={handleOnChange}
            value={state.maxW}
            name="maxW"
            placeholder="Max weight"
            className={style.short}
          />
          <p className={errors.weight ? style.danger : style.none}>
            {errors.weight}
          </p>
        </div>
        <div>
          <input
            onChange={handleOnChange}
            value={state.minH}
            name="minH"
            placeholder="Min height"
            className={style.short}
          />{" "}
          -{" "}
          <input
            onChange={handleOnChange}
            value={state.maxH}
            name="maxH"
            placeholder="Max height"
            className={style.short}
          />{" "}
          <p className={errors.height ? style.danger : style.none}>
            {errors.height}
          </p>
        </div>
        <input
          onChange={handleOnChange}
          value={state.bredF}
          name="bredF"
          placeholder="Bred for"
        />
        <input
          onChange={handleOnChange}
          value={state.origin}
          name="origin"
          placeholder="Origin"
        />
        <input
          onChange={handleOnChange}
          value={state.url}
          name="url"
          placeholder="Image URL"
        />
        <p className={errors.url ? style.danger : style.none}>{errors.url}</p>
        Temperaments
        <Temperaments onSelect={onTempSelected} tempers={[{name: "Bonito", id: 1}, {name: "Feliz", id: 2}]}/>
      </div>
      <button>¡CREATE!</button>
    </form>
  );
}
