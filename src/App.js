import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Folder from "./pages/Folder";
import Bin from "./pages/Bin";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import Upload from "./testpages/Upload";
import ContextMenu from "./testpages/ContextMenu";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/bin" element={<Bin />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/contextmenu" element={<ContextMenu />} />
      </Routes>
    </BrowserRouter>
  );
}
