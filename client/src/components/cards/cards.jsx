// import React, { useEffect } from "react";
import Card from "../eachCard/card.jsx";
import { useSelector } from "react-redux";
// import * as actionCreators from "../../actions";
// import { useDispatch } from "react-redux";
// import store from "../../store/index.js";

export default function Cards() {
  const dogsRedux = useSelector(state => state.dogs)
  
  const generateDogsCards = function() {
    return dogsRedux ? (
      <Card dog={dogsRedux[0]}/>
    ) : (
      // this.props.dogs[0].map((d) => <Card dogs={d} />)
      <p>There's no dogs to show</p>
    );
  }

  return <ul>{generateDogsCards()}</ul>;
}