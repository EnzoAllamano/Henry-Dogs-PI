import React from "react";
import style from "./pages.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage, firstPage, lastPage } from "../../actions";
import { dogsPerPage } from "../../reducers";

export default function Pages() {
  const actualPage = useSelector((state) => state.actualPage);
  const dogsCount = useSelector(state => state.dogs.length) 
  var dispatch = useDispatch();

  function onClickPage(element) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    dispatch(changePage(parseInt(element.target.id)));
  }

  function buttonsPages(actualP) {
    let res = [],
      thisNPage;
      // Si el número actual de página es inferior a 3, para que no muestre página 0 o -1 se setea en 3
    if (actualP < 3) actualP = 3;
    let totalPages = Math.floor(dogsCount/dogsPerPage)
    // Si el número actual de página supera los 21 (total - 2), para que no muestre
    // botones de página 22 y 23 lo pone en 20 (total - 1)(solo al valor de la variable de esta función, el estado no lo toca)
    if(actualP > totalPages - 2) actualP = (totalPages - 1) 
    for (let i = 2; i > -3; i--) {
      // En el caso que la cantidad de páginas a mostrar sea menor que el i que está calculando el número pasa al siguiente para evitar
      // mostrar 0, -1, -2, -3 cuando solo hay una página 
      if(i >= totalPages - 1) continue
      thisNPage = actualP - i;
      res.push(
        <li key = {thisNPage}
          onClick={onClickPage}
          id={thisNPage}
          style={
            actualPage === thisNPage // actualPage es el valor de Redux, thisNPage es el valor calculado a mostrar
              ? { backgroundColor: "var(--active-button1)" } // El número de página seleccionado se colorea más oscuro
              : {  }
          }
        >
          {actualP - i}
        </li>
      );
    }
    return res;
  }

  return (
    <ul className={style.ulContainer}>
      <li className={style.button} onClick={() => dispatch(firstPage())}>{"<<"}</li>
      {buttonsPages(actualPage)}
      <li className={style.button} onClick={() => dispatch(lastPage())}>{">>"}</li>
    </ul>
  );
}
