import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Folder from "./pages/Folder";
import Bin from "./pages/Bin";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/bin" element={<Bin />} />
      </Routes>
    </BrowserRouter>
  );
}
