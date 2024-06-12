import axios from "axios";

export const restoreFile = async (fileId) => {
  try {
    const response = await fetch(`http://3.38.95.127:8080/file/restore/${fileId}`, {
      method: 'PATCH',
      headers: {
        'accept': '*/*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error restoring file:', error);
    throw error;
  }
};


export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`http://3.38.95.127:8080/file/delete/${fileId}`, {
      headers: {
        accept: '*/*',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting file with ID ${fileId}:`, error);
    throw error;
  }
};

export const deleteAllFiles = async (fileIds) => {
  try {
    await Promise.all(fileIds.map(fileId => axios.delete(`http://3.38.95.127:8080/file/delete/${fileId}`, {
      headers: {
        accept: '*/*',
      },
    })));
  } catch (error) {
    console.error('Error deleting all files:', error);
    throw error;
  }
};