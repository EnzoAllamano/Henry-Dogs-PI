import React from 'react'
import style from './nav.module.css'
import Search from '../search/search.jsx'
const {Link} = require('react-router-dom')

export default function Nav(){
    return (
        <nav className = {style.mainDiv}>
            <ul className = {style.ul}>
            <Link to = "/home"><i class="fas fa-home"></i><h3 className={style.home}>Home</h3></Link>
            <Link to = "/create"><i class="fas fa-pencil-alt"></i><h3 className={style.create}>Create</h3></Link>
            <Link to = "/about"><i class="fas fa-address-card"></i><h3 className={style.about}>About</h3></Link>
            </ul>
            <Search></Search>

        </nav>
    )
}