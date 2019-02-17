import ssr from "./server";
import configureStore from "../src/redux/configureStore";
import { matchPath } from "react-router-dom";
import routes from "../src/app/routes";

export default function(app) {
  app.get("*", (req, res) => {
    const store = configureStore();
    const dataRequirements = routes
      .filter(route => matchPath(req.url, route))
      .map(route => {
        return route.serverFetch ? route.serverFetch(store) : null;
      });

    Promise.all(dataRequirements).then(() => {
      const response = ssr(req.url, store);
      res.send(response);
    });
  });
}
