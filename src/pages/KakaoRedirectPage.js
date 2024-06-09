import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/login.module.css";

function KakaoRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const handleOAuthKakao = async (code) => {
    try {
      // 카카오로부터 받아온 code를 서버에 전달. 카카오로 회원가입 & 로그인
      const response = await axios.get(`http://3.38.95.127:8080/oauth/login/KAKAO?code=${code}`);
      const data = response.data;
      console.log(data);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("rootFolderId", data.rootFolderId)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer); 
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 주기.
    if (code) {
      handleOAuthKakao(code);
    }
  }, [location]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 1000);
      return () => clearTimeout(timer); 
    }
  }, [isLoading, navigate]);

  return (
    <div className={styles.container}>
      <div style={{ height: "120px" }}></div>
      <div className={styles.title}>Welcome to 3D box</div>
      <div style={{ height: "20px" }}></div>
      <object type="image/svg+xml" data="/assets/images/projectdesc.svg">
          <img src="/assets/images/projectdesc.svg" alt="Project Description" />
      </object>
      <div className={styles.statusContainer}>
        {isLoading ? (
          <>
            <div class={styles.loadingSpinner}>
              <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
            <div className={styles.loadingText}>Loading</div>
          </>
        ) : (
          <>
            <div className={styles.checkIcon}></div>
            <div className={styles.loginSuccess}>Login Successful!</div>
          </>
        )}
      </div>
    </div>
  );
};

export default KakaoRedirectPage;