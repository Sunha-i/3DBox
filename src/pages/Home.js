import React, { useRef, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "../styles/home.module.css";
import File from "../components/File";
import CheckboxGroup from "../components/CheckBox/CheckboxGroup";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const modalBackground = useRef();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModifyModal = () => {
    setModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.main}>
        <SideBar />
        <div className={styles.content}>
          <div className={styles.button_container}>
            <label className={styles.upload}>
              <input type="file" className={styles.file} />
              <img src="/assets/images/upload.png" alt="upload" />
              <p>업로드</p>
            </label>
            <div className={styles.create} onClick={openModal}>
              <img src="/assets/images/folder-plus.png" alt="upload" />
              <p>폴더 만들기</p>
            </div>
          </div>
          <h3 style={{ margin: "0 30px" }}>모든 파일</h3>
          <div className={styles.button_container}>
            <div
              className={styles.button}
              style={{ backgroundColor: "#4545C2" }}
            >
              <img src="/assets/images/upload.png" alt="upload" />
              <p style={{ color: "white" }}>다운로드</p>
            </div>
            <div className={styles.button} onClick={openModifyModal}>
              <img src="/assets/images/rename.png" alt="upload" />
              <p>이름 변경</p>
            </div>
            <div className={styles.button}>
              <img src="/assets/images/share.png" alt="upload" />
              <p>항목 공유</p>
            </div>
            <div
              className={styles.button}
              style={{ width: "70px" }}
              onClick={openDeleteModal}
            >
              <img src="/assets/images/trash.png" alt="upload" />
              <p>삭제</p>
            </div>
          </div>
          <div className={styles.content_container}>
            <CheckboxGroup values={files} onChange={setFiles}>
              <File name="구름1" />
              <File name="구름2" />
            </CheckboxGroup>
          </div>
          {modalOpen && ( // 폴더 생성 모달
            <div
              className={styles.modal}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              <div className={styles.modal_content}>
                <div className={styles.close}>
                  <h2>폴더 생성</h2>
                  <img
                    src="/assets/images/close.png"
                    alt="close"
                    onClick={closeModal}
                    width={30}
                    height={30}
                  />
                </div>
                <p>이름</p>
                <input type="text" className={styles.input}></input>
                <div className={styles.btn_container}>
                  <button className={styles.btn} onClick={closeModal}>
                    취소
                  </button>
                  <button
                    className={styles.btn}
                    style={{ backgroundColor: "#4545C2", color: "white" }}
                  >
                    만들기
                  </button>
                </div>
              </div>
            </div>
          )}
          {modifyModalOpen && ( // 이름 변경 모달
            <div
              className={styles.modal}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModifyModalOpen(false);
                }
              }}
            >
              <div className={styles.modal_content}>
                <div className={styles.close}>
                  <h2>이름 변경</h2>
                  <img
                    src="/assets/images/close.png"
                    alt="close"
                    onClick={closeModifyModal}
                    width={30}
                    height={30}
                  />
                </div>
                <p>이름</p>
                <input type="text" className={styles.input}></input>
                <div className={styles.btn_container}>
                  <button className={styles.btn} onClick={closeModifyModal}>
                    취소
                  </button>
                  <button
                    className={styles.btn}
                    style={{ backgroundColor: "#4545C2", color: "white" }}
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          )}
          {deleteModalOpen && ( // 파일 & 폴더 삭제 모달
            <div
              className={styles.modal}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  closeDeleteModal();
                }
              }}
            >
              <div className={styles.modal_content}>
                <div className={styles.close}>
                  <h2>항목 삭제</h2>
                  <img
                    src="/assets/images/close.png"
                    alt="close"
                    onClick={closeDeleteModal}
                    width={30}
                    height={30}
                  />
                </div>
                <p>이 항목을 삭제하시겠습니까?</p>
                <div
                  className={styles.btn_container}
                  style={{ marginTop: "45px" }}
                >
                  <button className={styles.btn} onClick={closeDeleteModal}>
                    취소
                  </button>
                  <button
                    className={styles.btn}
                    style={{ backgroundColor: "#4545C2", color: "white" }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
