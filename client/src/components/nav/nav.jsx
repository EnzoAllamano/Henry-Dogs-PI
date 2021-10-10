import React from 'react'
import style from './nav.module.css'
import Search from '../search/search.jsx'
import { useDispatch,useSelector } from "react-redux";
import { sortDogs, switchDark } from "../../actions";
const {Link} = require('react-router-dom')

export default function Nav(){
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode)

    return (
        <nav className = {style.mainDiv}>
            <div className = {style.div}>
            <Link to = "/home"><i class="fas fa-home"></i><h3 className={style.home}>Home</h3></Link>
            <Link to = "/create"><i class="fas fa-pencil-alt"></i><h3 className={style.create}>Create</h3></Link>
            <Link to = "/about"><i class="fas fa-address-card"></i><h3 className={style.about}>About</h3></Link>
            </div>
            <Search/>
            <button className={style.darkMode} onClick={() => dispatch(switchDark())}>{darkMode ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
        </nav>
    )
}