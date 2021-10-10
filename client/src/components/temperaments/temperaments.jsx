import React from "react";
import style from "./temperaments.module.css";
import { useState, useEffect } from "react";

export default function Temperamnts({ onSelect, tempers }) {
  console.log(tempers);
  let allTemps = tempers;

  const [show, setShow] = useState(false);
  const [temps, setTemps] = useState([]);
  useEffect(() => {setTemps(tempers)}, [])

  function handleOnSearchChange(e) {
      setTemps(allTemps.filter(t => t.name.toLowerCase().includes(e.target.value)))
  }

  function myFunction() {
    setShow(!show);
  }

  return (
    <div className={style.dropdown}>
      <button onClick={myFunction} className={style.dropbtn}>
        Add temperaments
      </button>
      <div className={show ? style.dropdownContent : style.none}>
        <input placeholder="Search..." onChange={handleOnSearchChange} />
        {temps ? (
          temps.map((t) => {
            console.log(t);
            return (
              <span>
                <input
                  id={t.id}
                  onChange={(e) => onSelect(e)}
                  type="checkbox"
                  />
                  <label>{t.name}</label>
              </span>
            );
          })
        ) : (
          <p>No hay no existe</p>
        )}
      </div>
    </div>
  );
}
