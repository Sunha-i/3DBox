import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FolderProvider } from "./context/FolderContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Folder from "./testpages/Folder";
import Bin from "./pages/Bin";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import Upload from "./testpages/Upload";
import Game from "./testpages/Game";
import FolderContents from "./testpages/FolderContents";
import FolderTree from "./testpages/FolderTree";

export default function App() {
  return (
    <FolderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/oauth/redirected/KAKAO"
            element={<KakaoRedirectPage />}
          />
          <Route path="/folder" element={<Folder />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/nonogram" element={<Game />} />
          <Route path="/foldercontents/" element={<FolderContents />} />
          <Route path="/foldercontents/:id" element={<FolderContents />} />
          <Route path="/foldertree" element={<FolderTree />} />
        </Routes>
      </BrowserRouter>
    </FolderProvider>
  );
}
