import React, { createContext, useState, useEffect } from "react";

export const FolderContext = createContext();

export const FolderProvider =({ children }) => {
  const [folderTree, setFolderTree] = useState(null);

  const fetchFolderData = async (folderId) => {
    try {
      const response = await fetch(`http://144.24.83.40:8080/folder/child/folder/${folderId}`);
      const data = await response.json();
      console.log(data.folders);
      return data.folders;
    } catch (error) {
      console.error("Error fetching folder data:", error);
      return [];
    }
  };

  const buildFolderTree = async (folderId) => {
    const childrenFolders = await fetchFolderData(folderId);
    const children = await Promise.all(
      childrenFolders.map(async (folder) => ({
        id: folder.folder_id.toString(),
        type: "folder",
        name: folder.folder_name,
        children: await buildFolderTree(folder.folder_id, folder.folder_name)
      }))
    );

    return children;
  };

  const initializeFolderTree = async () => {
    const rootFolderId = 2;  // Root folder ID (하드코딩)
    const rootFolderChildren = await buildFolderTree(rootFolderId);
    setFolderTree(rootFolderChildren);
  };

  useEffect(() => {
    initializeFolderTree();
  }, []);

  return (
    <FolderContext.Provider value={{ folderTree }}>
      {children}
    </FolderContext.Provider>
  );
}