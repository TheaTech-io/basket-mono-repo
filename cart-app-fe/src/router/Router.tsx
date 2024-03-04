import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
