import React from 'react'
import style from './nav.module.css'
const {Link} = require('react-router-dom')

export default function Nav(){
    return (
        <div className = {style.mainDiv}>
            <Link to = "/home"><h1>HOME</h1></Link>
            <div className={style.navSeachBar}>
                <input></input>
                <button>Buscar</button>
            </div>
        </div>
    )
}