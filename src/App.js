import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Folder from "./testpages/Folder";
import Bin from "./pages/Bin";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import Upload from "./testpages/Upload";
import Game from "./testpages/Game";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirected/KAKAO" element={<KakaoRedirectPage />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/bin" element={<Bin />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/nonogram" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
