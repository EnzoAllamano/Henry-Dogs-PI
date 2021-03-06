import React from "react";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <ul className={style.ulMain}>
      <li className= {style.instagram}>
        <a
          target = "_blank"
          rel="noreferrer"
          href="https://www.instagram.com/enzo_allamano/"
          className={style.icon}
        >
          <i className="fab fa-instagram"></i>{" "}
        </a>
      </li>
      <li className ={style.github}>
        <a
          target = "_blank"
          rel="noreferrer"
          href="https://github.com/EnzoAllamano"
          className={style.icon}
        >
          <i className="fab fa-github"></i>{" "}
        </a>
      </li>
      <li className ={style.google}>
        <a
          target = "_blank"
          rel="noreferrer"
          href="mailto:eallamano@gmail.com"
          className={style.icon}
        >
          <i className="fab fa-google"></i>
        </a>
      </li>
      <li className ={style.linkedin}>
        <a
          target = "_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/enzo-allamano-0b9190214/"
          className={style.icon}
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </li>
    </ul>
  );
}
