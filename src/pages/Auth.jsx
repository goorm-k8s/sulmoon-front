import { useEffect } from 'react';

const formUrlEncoded = x =>
    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get('code');  // 카카오에서 인가받은 코드

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
    }
  }, [code]);
  

  const kakaoLogin = async (code) => {
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';

    const user = {
      'grant_type': 'authorization_code',
      'client_id': '5af42f065a8d4e342c4249779e84b76e',
      'redirect_uri': REDIRECT_URI,
      'code': code
      // client_secret: 'YrxkYSpDQFEPnS4iKcPlOYmu7Yp0NCII',
    }

    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: formUrlEncoded(user)
    });
    const result = await response.json();

    if (result.access_token) {
      surveyLogin(result.access_token);
    }
  }
  
    const surveyLogin = async (access_token) => {
    const user = {
      'token': access_token,
      'provider': 'kakao',
    }

    const response = await fetch('http://3.35.95.59:10000/api/users/login/oauth2', {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
    },
      body: JSON.stringify(user)
    })
    const res = await response.json(); 

    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('providerId', res.providerId);

    window.location.href = '/';
  }

  return null
};

export default Auth;
