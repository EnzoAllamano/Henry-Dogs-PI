import React from "react";
import style from "./create.module.css";
import styleCards from "../home/home.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Temperaments from "../temperaments/temperaments.jsx";
import { getAllDogs } from "../../actions";

const initialState ={
  breed: "",
  minW: "",
  maxW: "",
  minH: "",
  maxH: "",
  minL: "",
  maxL: "",
  bredF: "",
  origin: "",
  url: "",
  temps: [],
}

export default function Create() {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({
    breed: "",
    weight: "",
    height: "",
    life: "",
    url: "",
  });

  const dispatch = useDispatch();

  function handleOnChange(e) {
    let value = e.target.value;
    switch (e.target.name) {
      case "breed": {
        if (value === "") setErrors({...errors, breed: "Breed Name cannot be empty" });
        else if (value.match(/([0-9])+/))
          setErrors({...errors, breed: "Breed Name cannot contain numbers" });
        else if (value.length > 35)
          setErrors({...errors,
            breed: "Breed Name cannot exceed 35 caracters",
          });
        else setErrors({...errors, breed: undefined });
        break;
      }

      case "minL":{
        if(value === "") setErrors({...errors, life: "Min life cannot be empty" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
        setErrors({...errors, life: "Life cannot have not numeric characters" });
        break;
      }

      case "maxL": {
        if(value === "") setErrors({...errors, life: "Max life cannot be empty" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
        setErrors({...errors, life: "Life cannot have not numeric characters" });
        break;
      }
      case "minW": {
        if (value === "") setErrors({...errors, weight: "Min weight cannot be empty" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({...errors, weight: "Weight cannot have not numeric characters" });
        else if (value <= 0)
          setErrors({...errors, weight: "Min weight cannot be 0 or lower" });
        else if (value > 500)
          setErrors({...errors, weight: "Min weight value is too high!" });
        else setErrors({...errors, weight: undefined });
        break;
      }

      case "maxW": {
        if (value === "") setErrors({...errors, weight: "Max weight cannot be empty" });
        else if (value <= 0)
          setErrors({...errors, weight: "Max weight cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({...errors, weight: "Weight cannot have not numeric characters" });
        else if (value > 500)
          setErrors({...errors, weight: "Max weight value is too high!" });
        else if (value < state.minW)
          setErrors({...errors,
            weight: "Max weight should be lower than Min weight",
          });
        else setErrors({...errors, weight: undefined });
        break;
      }

      case "minH": {
        if (value === "") setErrors({...errors, height: "Min height cannot be empty" });
        else if (value <= 0)
          setErrors({...errors, height: "Min height cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({...errors, height: "Height cannot have not numeric characters" });
        else setErrors({...errors, height: undefined });
        break;
      }

      case "maxH": {
        if (value === "") setErrors({...errors, height: "Max height cannot be empty" });
        else if (value <= 0)
          setErrors({...errors, height: "Max height cannot be 0 or lower" });
        else if (!value.toLowerCase().match(/^[0-9]+$/))
          setErrors({...errors, height: "Height cannot have not numeric characters" });
        else if (value < state.minH)
          setErrors({...errors,
            height: "Max height should be lower than Min weight",
          });
        else setErrors({...errors, height: undefined });
        break;
      }

      case "url": {
        if (value === "") setErrors({...errors, url: "Image shouldn't be empty" });
        else setErrors({...errors, url: undefined });
        break;
      }
      default:{
        break
      }
    }
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function onTempSelected(temp) {
    if (state.temps.find((t) => t.id === temp.id) === undefined)
      setState({ ...state, temps: [...state.temps, temp] });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    let emptyFields = false, hasErrors = false
    Object.keys(state).forEach((key) => {
      if (state[key].length === 0) {
        emptyFields = true
      return
    };
    })
    Object.keys(errors).forEach((key) => {
      if(errors[key]) {
        hasErrors = true
        return
      }
    })
    if(emptyFields) {
      alert("All the fields must be complete");
      return;
    }
    if(hasErrors){
      alert("There are some errors in the input")
    }
    let res = await fetch("/dogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    res = await res.json();
    alert(res.msg);
    if(!res.error) setState(initialState)
    else return
    dispatch(getAllDogs());
  }
  function onTempUnselected(temp) {
    setState({ ...state, temps: state.temps.filter((t) => t.id !== temp.id) });
  }

  return (
    <form onSubmit={handleOnSubmit} className={styleCards.mainDiv} autoComplete="off">
      <div className={style.inputContainer}>
        <input
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
            value={state.minL}
            name="minL"
            placeholder="Min life"
            className={style.short}
          />{" "}
          -{" "}
          <input
            onChange={handleOnChange}
            value={state.maxL}
            name="maxL"
            placeholder="Max life"
            className={style.short}
          />{" "}
          <p className={errors.life ? style.danger : style.none}>
            {errors.height}
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
        <h2>Temperaments</h2>
        <Temperaments
          state={state}
          onSelect={onTempSelected}
          onUnselect={onTempUnselected}
        />
          <div onClick={handleOnSubmit} className={style.buttonCreate}>
        <i class="fas fa-pencil-alt"></i><h3 className={style.create}>¡CREATE!</h3>
          </div>
      </div>
    </form>
  );
}
