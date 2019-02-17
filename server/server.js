import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { getBundles } from "react-loadable/webpack";
import stats from "../public/react-loadable.json";
import App from "../src/app/App";
import template from "./template";
import Loadable from "react-loadable";

export default function render(url, store) {
  const reactRouterContext = {};
  const modules = [];

  let content = renderToString(
    <StaticRouter location={url} context={reactRouterContext}>
      <Provider store={store}>
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <App />
        </Loadable.Capture>
      </Provider>
    </StaticRouter>,
  );

  const helmet = Helmet.renderStatic();
  let bundles = getBundles(stats, modules);
  const state = store.getState();

  return template({ helmet, content, bundles, state });
}
