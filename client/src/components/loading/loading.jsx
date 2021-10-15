import React from "react"
import loadingImage from '../../img/dug-waiting.gif'
import styleLoading from '../detailsModal/detailsModal.module.css'
import style from './loading.module.css'

export default function Loading(){
    return (
        <div className={`${styleLoading.detailsModal} ${style.container}`}>
            <h1>Loading</h1>
            <img className = {style.imgLoading} alt = "loading" src = {loadingImage}/>
        </div>
    )
}