import React from "react";
import { connect } from "react-redux";
import Card from "../eachCard/card.jsx";
import { Component } from "react";
import * as actionCreators from "../../actions";
import { bindActionCreators } from "redux";

// export default function Cards(){
//     return (
//         <div>
//             <Card></Card>
//         </div>
//     )
// }

export class Cards extends Component {
  constructor(props) {
    super(props);
  }
  generateDogsCards() {
    return this.props.dogs ? (
      <Card dog={this.props.dogs[0]} />
    ) : (
      // this.props.dogs[0].map((d) => <Card dogs={d} />)
      <p>There's no dogs to show</p>
    );
  }
  render() {
    return <ul>{this.generateDogsCards()}</ul>;
  }
}

function mapStateToProps(state) {
  return {
    dogs: state.dogs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
