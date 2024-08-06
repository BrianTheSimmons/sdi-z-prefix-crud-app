import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Itemlist from "./Itemlist";
import CreateAccount from "./Createaccount";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/itemlist" element={<Itemlist />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
