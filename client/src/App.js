import style from "./App.module.css";
import { Route } from "react-router";
import Home from "./components/home/home.jsx";
import Landing from "./components/landing/landing.jsx";
import Nav from "./components/nav/nav.jsx";
let expr = new RegExp('\/.+')
function App() {
  return (
    <div className={style.app}>
      <Route path={expr} component={Nav}/>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
    </div>
  );
}

export default App;
