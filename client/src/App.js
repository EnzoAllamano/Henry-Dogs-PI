import style from './App.module.css'
import { Route } from "react-router";
import Home from "./components/home/home.jsx";
import Landing from "./components/landing/landing.jsx";
import Nav from "./components/nav/nav.jsx";
import Footer from "./components/footer/footer.jsx";
import { useSelector } from "react-redux";
import Create from "./components/create/create.jsx";

function App() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${style.app} ${darkMode ? style.dark : style.light}`}>
      <Route path={/[/].+/} component={Nav} />
      <Route path="/create" component={Create} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route path={/[/].+/} component={Footer} />
    </div>
  );
}

export default App;
