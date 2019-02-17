import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const state = window.__STATE__;
const store = configureStore(state);

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector("#app"),
  );
});
