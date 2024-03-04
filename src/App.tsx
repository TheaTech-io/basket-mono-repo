import React from "react";
import Router from "./router/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";
const App = (): JSX.Element => {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
};

export default App;
