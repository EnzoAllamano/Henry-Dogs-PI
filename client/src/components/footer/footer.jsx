import React from "react";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <ul className={style.ulMain}>
      <li className= {style.instagram}>
        <a
          href="https://www.youtube.com"
          className={style.icon}
        >
          <i class="fab fa-instagram"></i>{" "}
        </a>
      </li>
      <li className ={style.github}>
        <a
          href="https://www.youtube.com"
          className={style.icon}
        >
          <i class="fab fa-github"></i>{" "}
        </a>
      </li>
      <li className ={style.google}>
        <a
          href="https://www.youtube.com"
          className={style.icon}
        >
          <i class="fab fa-google"></i>
        </a>
      </li>
      <li className ={style.linkedin}>
        <a
          href="https://www.youtube.com"
          className={style.icon}
        >
          <i class="fab fa-linkedin"></i>
        </a>
      </li>
    </ul>
  );
}
