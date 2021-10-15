import React from "react";
import style from "./search.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs, startLoading } from "../../actions/index.js";

export default function Search() {
  const dispatch = useDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    e.target.value = "";
    dispatch(startLoading())
    dispatch(searchDogs(name));
    setName("")
  }

  function handleOnChange(e) {
    setName(e.target.value);
  }

  const [name, setName] = useState("");

  return (
    <form onSubmit={handleOnSubmit} className={style.divContainer}>
      <input onChange={handleOnChange} value={name} placeholder="Search a dog breed" ></input>
      <button type="submit">
        Buscar
      </button>
    </form>
  );
}
