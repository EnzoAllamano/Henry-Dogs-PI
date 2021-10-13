import React, { useState } from "react";
import style from "./filter.module.css";
import { useDispatch,useSelector } from "react-redux";
import { clearFilters, filterByTemperaments, filterDogs, sortDogs, switchDark } from "../../actions";
import Temperaments from '../temperaments/temperaments.jsx'


export default function Filters() {
  const dispatch = useDispatch();
const [selectedTemps, setSelectedTemps] = useState({temps: []})
const [show, setShow] = useState(false)
  var sorter = {
    sortDirection: 1,
    sortParam: "name",
  };

function handleOnClickFilter(element){
  dispatch(filterDogs(element.target.id === "DB" ? true : false))
}

function onTempSelected(temp){
  setShow(false)
  setSelectedTemps({temps: [...selectedTemps.temps, temp]})
  dispatch(filterByTemperaments([...selectedTemps.temps, temp]))
}

function onTempUnselected(temp){
  setSelectedTemps({temps: selectedTemps.temps.filter(t => t.id !== temp.id)}) // Quita el temperamento pasado buscandolo por id
  dispatch(filterByTemperaments(selectedTemps.temps.filter(t => t.id !== temp.id))) // Filtra nuevamente
}

  function handleOnClickSort(element) {
    // Si ya se había ordenado por nombre, se ordena al revés
    if(element.target.id === sorter.sortParam) sorter.sortDirection = sorter.sortDirection * -1
    // Siempre se ordena ascendentemente la primera vez
    else {sorter.sortDirection = 1; sorter.sortParam = element.target.id} 
    element.target.innerHTML = sorter.sortDirection === 1 ? element.target.id + "🢁" : element.target.id + "🢃"
    dispatch(sortDogs(sorter));
  }
  return (

    <div className={style.divContainer}>
      <button
        onClick={() => dispatch(clearFilters())}
      >
        Clear
      </button>
      <button
        onClick={(element) => handleOnClickFilter(element)}
      >
        APIDogs
      </button>
      <button
      id="DB"
        onClick={(element) => handleOnClickFilter(element, )}
      >
        DBDogs
      </button>
      <button
      id="name"
        onClick={(element) => handleOnClickSort(element, "name")}
      >
        NAME🢁
      </button>
      <button
      id="weight"
        onClick={(element) => handleOnClickSort(element, "weight")}
      >
        WEIGHT🢁
      </button>
      <button onClick={()=> setShow(!show)}>Filter by temperaments</button>
      {show? <div className= {style.floatingTemps}><Temperaments state={selectedTemps} onSelect={onTempSelected} onUnselect={onTempUnselected}/> </div>: undefined}
    </div>
  );
}
