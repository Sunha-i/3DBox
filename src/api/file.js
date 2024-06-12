import axios from "axios";

// 파일 다운로드
export const handleDownload = async (fileId) => {
  try {
    const response = await axios.get(
      `http://3.38.95.127:8080/file/download/${fileId}`,
      {
        responseType: "blob", // 파일을 다운로드하기 위해 blob으로 응답받음
        headers: {
          Accept: "*/*",
        },
      }
    );

    // 파일 다운로드를 위한 URL 생성
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Content-Disposition 헤더로 파일명 가져오기
    const disposition = response.headers["content-disposition"];
    const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = fileNameRegex.exec(disposition);
    let fileName = "file";
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, "");
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // 다운로드 후 URL 해제
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// 파일 휴지통 이동
export const handleMoveToTrash = async (fileId) => {
  try {
    const response = await fetch(
      `http://3.38.95.127:8080/file/trash/${fileId}`,
      {
        method: "PATCH",
        headers: {},
      }
    );

    if (response.ok) {
      console.log("File moved to trash successfully.");
      // Optionally, add any state update or UI feedback here
    } else {
      console.error("Error moving file to trash:", response.statusText);
    }
  } catch (error) {
    console.error("Error moving file to trash:", error);
  }
};

// 파일 복사
export async function copyFile(fileId, folderId) {
  try {
    const response = await fetch(`http://3.38.95.127:8080/file/copy/${fileId}/${folderId}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      console.log('File copied successfully!');
    } else {
      console.error('Failed to copy file:', response.statusText);
    }
  } catch (error) {
    console.error('Error copying file:', error);
  }
}