import React from "react";
import style from "./pages.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../actions";

export default function Pages() {
  const actualPage = useSelector((state) => state.actualPage);
  var dispatch = useDispatch();

  function onClickPage(element) {
    dispatch(changePage(element.target.id));
  }

  function buttonsPages(actualP) {
    let res = [],
      thisNPage;
    if (actualP < 3) actualP = 3;
    for (let i = 2; i > -3; i--) {
      thisNPage = actualP - i;
      res.push(
        <li
          onClick={onClickPage}
          id={thisNPage}
          style={
            actualPage == thisNPage
              ? { backgroundColor: "var(--active-button1)" }
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
      <li className={style.button}>{"<<"}</li>
      {buttonsPages(actualPage)}
      <li className={style.button}>{">>"}</li>
    </ul>
  );
}
