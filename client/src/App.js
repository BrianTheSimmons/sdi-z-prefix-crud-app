import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Itemlist from "./Itemlist";
import CreateAccount from "./Createaccount";
import UserPage from "./UserPage";
import "./App.css";
import Login from "./Login";
import AddItem from "./AddItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/itemlist" element={<Itemlist />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/createitem/:id/:username" element={<AddItem />} />
    </Routes>
  );
}

export default App;
