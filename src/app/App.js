import React from "react";
import { Switch, Route } from "react-router";
import routes from "app/routes";

export default function App() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
}
