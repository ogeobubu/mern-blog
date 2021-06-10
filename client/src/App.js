import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import Articles from "./pages/Articles/Articles";
import Story from "./pages/Story/Story";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route path="/" exact component={user ? Home : Login} />
        <Route path="/register" component={user ? Home : Register} />
        <Route path="/login" component={user ? Home : Login} />
        <Route path="/story" component={user ? Story : Login} />
        <Route path="/settings" component={user ? Settings : Login} />
        <Route path="/post/:id" component={Articles} />
      </Switch>
    </Router>
  );
}

export default App;
