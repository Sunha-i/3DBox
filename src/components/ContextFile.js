import React, { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState("");

  return (
    <FileContext.Provider value={{ currentId, setCurrentId }}>
      {children}
    </FileContext.Provider>
  );
};
