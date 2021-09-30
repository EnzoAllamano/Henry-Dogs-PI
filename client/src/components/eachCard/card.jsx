import React from 'react'
import style from './card.module.css'

export default function Card({dog}) {
    return(
        <div className= {style.div_body}>
        <figure className={style.figure}>
        <h1 className={style.h1}>{dog.name}</h1>
        <img className={style.img} src="https://cdn2.thedogapi.com/images/pk1AAdloG.jpg" alt="this is a dog" />
        <figcaption className={style.figcaption}>
            <h3 className={style.h3}>
                
            </h3>
            <p className={style.p}>Descripcion del perro
                 </p>
            <button className={style.button}>
                View more
            </button>
        </figcaption>
    </figure>
        </div>
    )
}