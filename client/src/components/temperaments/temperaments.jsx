import React from "react";
import style from "./temperaments.module.css";
import { useState, useEffect } from "react";
import styleCard from '../card/card.module.css'
import { useSelector } from "react-redux";

var allTemps = [];
export default function Temperaments({ onSelect, onUnselect, state }) {
  
  const [temps, setTemps] = useState([]); // Los temperamentos se deben actualizar durante la búsqueda
  
  useEffect(async () => {
    let temperaments = await fetch("temperaments");
    allTemps = await temperaments.json();
    setTemps(allTemps);
  }, []); // Cuando carga el componente se cargan los temperamentos como un estado local

  function handleOnSearchChange(e) {
    setTemps(
      allTemps.filter((t) => t.name.toLowerCase().includes(e.target.value))
    ); // Por cada letra escrita filtra los temperamentos
  }

  const darkMode = useSelector(state => state.darkMode)

  let colors =  darkMode ? ["#1D4B67", "#601313", "#4D1721", "#2D481E", "#1E361B", "#1C1B27", "#1E3A30",  "#62500F"] :
  ["#B5EAEA", "#FFBCBC", "#F38BA0", "#B1E693", "#6ECB63", "#6F69AC", "#95DAC1", "#FFEBA1"]
  
  return (
    <div>

      <div className={style.dropdownContent}>
      <div>
        <input className={style.search} placeholder="Search..." onChange={handleOnSearchChange} />

        <ul  className = {`${style.tempsContainer} ${styleCard.ul}`}>

        {temps ? (
          temps.map((t) => {
            return (
              <span>
                <li  style={{backgroundColor: chooseTemperamentColor(t.name)}} id={t.id} onClick={() => onSelect(t)}>
               {" " + t.name}</li>
              </span>
            );
          })) : (
            <p>There's an error and nothing to show here</p>
            )}
            </ul>
      </div>
      { <ul className = {`${style.selectedTemps} ${styleCard.ul}`}>
           { state.temps.map(t => <li style={{backgroundColor: chooseTemperamentColor(t.name)}} onClick={() => onUnselect(t)}>{t.name}</li>)}
          </ul>}
      </div>
    </div>
  );
  
  function chooseTemperamentColor(t){
    return colors[t[0].charCodeAt() % colors.length] 
  }
}
