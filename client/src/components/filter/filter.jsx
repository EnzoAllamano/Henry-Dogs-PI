import React from "react";
import style from "./filter.module.css";
import { useDispatch,useSelector } from "react-redux";
import { sortDogs, switchDark } from "../../actions";


export default function Filters() {
  const dispatch = useDispatch();

  var sorter = {
    sortDirection: 1,
    sortParam: "name",
  };

  function handleOnClick(element) {
    // Si ya se había ordenado por nombre, se ordena al revés
    if(element.target.id === sorter.sortParam) sorter.sortDirection = sorter.sortDirection * -1
    // Siempre se ordena ascendentemente la primera vez
    else {sorter.sortDirection = 1; sorter.sortParam = element.target.id} 
    element.target.innerHTML = sorter.sortDirection === 1 ? element.target.id + "🢁" : element.target.id + "🢃"
    dispatch(sortDogs(sorter));
  }
  const darkMode = useSelector(state => state.darkMode)
  return (

    <div className={style.divContainer}>
      <select>
        <option>FILTRO</option>
      </select>
      <button
      id="name"
        onClick={(element) => handleOnClick(element, "name")}
      >
        NAME🢁
      </button>
      <button
      id="weight"
        onClick={(element) => handleOnClick(element, "weight")}
      >
        WEIGHT🢁
      </button>
      <button onClick={() => dispatch(switchDark())}>{darkMode ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
    </div>
  );
}
