import React, { createContext, createFactory } from "react";

import App from "../../App";

import React from "react";

function temperature() {
  const expr = [weather.main.temp];
  switch (expr) {
    case "Oranges":
      console.log("Oranges are $0.59 a pound.");
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }

  return <div>{this.props}</div>;
}

export default temperature;
