"use client";

import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    if (window.kakao) {
    }
  }, []);
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
