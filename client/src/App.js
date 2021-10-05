import style from "./App.module.css";
import { Route } from "react-router";
import Home from "./components/home/home.jsx";
import Landing from "./components/landing/landing.jsx";
import Nav from "./components/nav/nav.jsx";
import Footer from './components/footer/footer.jsx'
import Create from './components/create/create.jsx'

let expr = new RegExp('[/].+')
function App() {
  return (
    <div className={style.app}>
      <Route path={expr} component={Nav}/>
      <Route path = "/create" component= {Create}/>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route path = {expr} component={Footer}/>
    </div>
  );
}

export default App;
