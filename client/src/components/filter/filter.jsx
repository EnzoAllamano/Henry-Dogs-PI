import React, { useState } from "react";
import style from "./filter.module.css";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterByTemperaments,
  filterDogs,
  sortDogs,
} from "../../actions";
import Temperaments from "../temperaments/temperaments.jsx";

var sorter = {
  sortDirection: true,
  sortParam: "name",
  filterParam: true
};
export default function Filters() {
  const dispatch = useDispatch();
  const [selectedTemps, setSelectedTemps] = useState({ temps: [] });
  const [show, setShow] = useState(false);

  function handleOnClickFilter() {
    sorter.filterParam = !sorter.filterParam
    dispatch(filterDogs(sorter.filterParam)); // True para DB, false para API
  }

  function onTempSelected(temp) {
    setShow(false);
    setSelectedTemps({ temps: [...selectedTemps.temps, temp] });
    dispatch(filterByTemperaments([...selectedTemps.temps, temp]));
  }

  function onTempUnselected(temp) {
    setSelectedTemps({
      temps: selectedTemps.temps.filter((t) => t.id !== temp.id),
    }); // Quita el temperamento pasado buscandolo por id
    dispatch(
      filterByTemperaments(selectedTemps.temps.filter((t) => t.id !== temp.id))
    ); // Filtra nuevamente
  }

  function handleOnClickSort(element) {
    // Si ya se había ordenado por nombre, se ordena al revés
    if (element.target.id === sorter.sortParam)
      sorter.sortDirection = !sorter.sortDirection;
    // Siempre se ordena ascendentemente la primera vez
    else {
      sorter.sortDirection = true;
      sorter.sortParam = element.target.id;
    }
    dispatch(sortDogs(sorter));
  }

function clearAllFilters(){
  setSelectedTemps({temps: []})
  dispatch(clearFilters())
}

  return (
    <div className={style.divContainer}>
      <button onClick={clearAllFilters}><i className="fas fa-trash-alt"></i></button>
      <button id="DB" onClick={(element) => handleOnClickFilter(element)}>
      <i className={sorter.filterParam ? "fas fa-cloud" : "fas fa-database"}></i> {/*True es DB */ }
      </button>
      <button id="name" onClick={(element) => handleOnClickSort(element)}>
        {/*Si está en name y verdadero significa alfabéticamente */ }
      <i className={sorter.sortParam === "name" && sorter.sortDirection ? "fas fa-sort-alpha-down-alt" : "fas fas fa-sort-alpha-down"}></i>
      </button>
      {/*Si está en weight y verdadero significa menor a mayor */ }
      <button id="weight" onClick={(element) => handleOnClickSort(element)}>
      <i className={sorter.sortParam === "weight" && sorter.sortDirection ? "fas fa-weight-hanging" : "fas fa-feather"}></i>
      </button>
      <button onClick={() => setShow(!show)}><i className="fas fa-filter"></i></button>
      {show ? (
        <div className={style.floatingTemps}>
          <Temperaments
            state={selectedTemps}
            onSelect={onTempSelected}
            onUnselect={onTempUnselected}
          />{" "}
        </div>
      ) : undefined}
    </div>
  );
}
