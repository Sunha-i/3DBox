import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOAuthKakao = async (code) => {
    try {
      // 카카오로부터 받아온 code를 서버에 전달. 카카오로 회원가입 & 로그인
      const response = await axios.get(`http://localhost:8080/oauth/login/kakao?code=${code}`);
      const data = response.data;
      alert("Login successful!: " + data)
      navigate("/success");
    } catch (error) {
      navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 주기.
    if (code) {
      alert("CODE = " + code)
      handleOAuthKakao(code);
    }
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;