import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <React.Fragment>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Modern Web App - About Page" />
      </Helmet>
      About MWA <br />
      <Link to="/">home</Link>
    </React.Fragment>
  );
}
