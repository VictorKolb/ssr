import Loadable from "react-loadable";
import React from "react";
import { serverFetch as homeFetch } from "app/pages/Home/serverFetch";

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ "./pages/Home"),
  loading: () => <div>123</div>,
  delay: 300,
});

const AsyncAbout = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ "./pages/About"),
  loading: () => <div>123</div>,
  delay: 300,
});

export default [
  {
    path: "/",
    component: AsyncHome,
    serverFetch: homeFetch,
    exact: true,
  },
  {
    path: "/about",
    component: AsyncAbout,
    exact: true,
  },
];
