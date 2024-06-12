// 폴더 생성
export const createFolder = async (folderName, userId, parentId) => {
  try {
    const response = await fetch(
      'http://3.38.95.127:8080/folder/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderName: folderName,
          userId: userId,
          parentId: parentId,
        }),
      }
    );

    if (response.ok) {
      const newFolderId = await response.json();
      console.log(newFolderId);
      return newFolderId;
    } else {
      console.error("Error creating folder:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  }
};

// 폴더 휴지통 이동
export const handleFolderToTrash = async (folderId) => {
  try {
    const response = await fetch(
      `http://3.38.95.127:8080/folder/trash/${folderId}`,
      {
        method: "PATCH",
        headers: {},
      }
    );

    if (response.ok) {
      console.log("Folder moved to trash successfully.");
    } else {
      console.error("Error moving folder to trash:", response.statusText);
    }
  } catch (error) {
    console.error("Error moving folder to trash:", error);
  }
};