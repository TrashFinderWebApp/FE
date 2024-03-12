"use client";

import { useEffect } from "react";

function LoginPage(): JSX.Element {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        console.log("Kakao Map Loaded");
      });
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
}

export default LoginPage;
