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
      const response = await axios.get(`http://144.24.83.40:8080/oauth/login/KAKAO?code=${code}`);
      const data = response.data;
      localStorage.setItem("userId", data);
      setIsLoading(false);
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
        navigate("/upload");
      }, 1500);
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
      <div className={styles.spinnerContainer}>
        {isLoading &&<div className={styles.loadingSpinner}></div>}
        <div className={styles.loadingText}>{isLoading ? "Loading" : "Login Successful"}</div>
      </div>
    </div>
  );
};

export default KakaoRedirectPage;