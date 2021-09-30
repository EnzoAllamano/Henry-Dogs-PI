import style from "./landing.module.css";
import React from "react";
import img from "../../img/hello-dog_landing.png";
const {Link} = require('react-router-dom')

function Landing() {
  return (
    <div className={style.mainDiv}>
      <div className={style.landingDiv}>
          <h1 className={style.landingTitle}> HENRY DOGS</h1>
          <Link to="/home">
          <button className={style.landingButtonGo}>GUAU!</button>
        </Link>
        <div className={style.landingMsgDiv}>
        <img alt = "this is a happy dog" className={style.imgHelloDog} src={img} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
