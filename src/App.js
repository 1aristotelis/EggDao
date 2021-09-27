import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./pages/Auth";
import Compose from "./pages/Compose";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TwetchCallback from "./pages/TwetchCallback";
import Welcome from "./pages/Welcome";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.tokenTwetchAuth);
  useEffect(() => {
    if (localStorage.tokenTwetchAuth) {
      try {
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      }
      // TODO: isAuthenticated request
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Home /> : <Redirect to="/welcome" />}
        </Route>
        <Route exact path="/auth">
          {!loggedIn ? <Auth /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/compose" component={Compose} />
        <Route
          exact
          path="/compose/:id"
          render={(props) => <Compose {...props} />}
        />
        <Route exact path="/t/:id" render={(props) => <Detail {...props} />} />
        <Route
          exact
          path="/auth/callback/twetch"
          render={() => <TwetchCallback />}
        />
        <Route exact path="/u/:id" render={(props) => <Profile {...props} />} />
        <Route exact path="/welcome">
          {!loggedIn ? <Welcome /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}
