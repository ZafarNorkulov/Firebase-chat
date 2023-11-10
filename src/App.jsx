import { useContext } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";
import { MainContext } from ".";
import Loader from "./components/loader";

function App() {
  const { auth } = useContext(MainContext);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return user ? (
    <Switch key={"1"}>
      {privateRoutes?.map(({ path, Component }, index) => (
        <Route path={path} component={Component} exact key={index} />
      ))}
      <Redirect to={CHAT_ROUTE} />
    </Switch>
  ) : (
    <Switch key="2">
      {publicRoutes?.map(({ path, Component }, index) => (
        <Route path={path} component={Component} exact key={index} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
}

export default App;
