import style from "./landing.module.css";
import React from "react";
import img from "../../img/hello-dog_landing.png";
const { Link } = require("react-router-dom");

function Landing() {
  return (
    <div className={style.mainDiv}>
      <div className={style.landingDiv}>
        <h1 className={style.h1Title}> HENRY DOGS</h1>
        <h3 className={style.h3Quote}>{randomQuote()}</h3>
        <Link to="/home">
          <button className={style.buttonEnter}><i class="fas fa-paw"></i><span>¡ENTER!</span></button>
        </Link>
      </div>
      <div className={style.divDog}>
        <img alt="a happy dog" className={style.imgDog} src={img} />
      </div>
    </div>
  );

  function randomQuote() {
    let quotes = [
      "When all else fails, hug the dog.",
      "Pugs not drugs!",
      "Dogs are miracles with paws.",
      "Happiness is a warm puppy.",
      "Dog is my copilot.",
      "Dogs leave paw prints forever on our hearts.",
      "My kids have paws."
    ];
    return quotes[Math.floor(Math.random() * (quotes.length - 1))];
  }
}

export default Landing;
