import React, { createContext, useState, useEffect } from "react";

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [topFolderName, setTopFolderName] = useState("Sunha's folder list");
  const [folderTree, setFolderTree] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [putBackList, setPutBackList] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [updatedFileList, setUpdatedFileList] = useState([]);
  const [newFolderInfo, setNewFolderInfo] = useState(null);
  const [renameFolderInfo, setRenameFolderInfo] = useState(null);
  const [movedFileList, setMovedFileList] = useState([]);

  const rootFolderId = localStorage.getItem("rootFolderId");

  const fetchFolderData = async (folderId) => {
    try {
      const response = await fetch(
        `http://3.38.95.127:8080/folder/child/folder/${folderId}`
      );
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
        children: await buildFolderTree(folder.folder_id, folder.folder_name),
      }))
    );

    return children;
  };

  const initializeFolderTree = async () => {
    if (rootFolderId !== null) {
      const rootFolderChildren = await buildFolderTree(rootFolderId);
      setFolderTree(rootFolderChildren);
    }
  };

  useEffect(() => {
    initializeFolderTree();
  }, [rootFolderId, newFolderInfo, renameFolderInfo]);

  return (
    <FolderContext.Provider
      value={{
        folderTree,
        selectedId,
        setSelectedId,
        uploadImages,
        setUploadImages,
        topFolderName,
        setTopFolderName,
        putBackList,
        setPutBackList,
        checkedFiles,
        setCheckedFiles,
        editIndex,
        setEditIndex,
        updatedFileList,
        setUpdatedFileList,
        newFolderInfo,
        setNewFolderInfo,
        renameFolderInfo,
        setRenameFolderInfo,
        movedFileList,
        setMovedFileList
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
