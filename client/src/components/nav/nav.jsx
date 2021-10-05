import React from 'react'
import style from './nav.module.css'
const {Link} = require('react-router-dom')

export default function Nav(){
    return (
        <nav className = {style.mainDiv}>
            <ul className = {style.ul}>
            <Link className={style.link} to = "/home"><h3>Home</h3></Link>
            <Link to = "/create"><h3>Create</h3></Link>
            <Link to = "/about"><h3>About</h3></Link>
            </ul>
            <div className={style.navSeachBar}>
                <input></input>
                <button className={style.buttonSearch}>Buscar</button>
            </div>
        </nav>
    )
}