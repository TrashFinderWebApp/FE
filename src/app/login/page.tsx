"use client";

import KakaoLoginIMG from "public/img/KakaoLogin.png";
import GoogleLoginSVG from "public/svg/GoogleLogin.svg";
import NaverLoginIMG from "public/img/NaverLogin.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Util/modal";

const onLogin = (provider: string) => async () => {
  await signIn(provider, {
    callbackUrl: "/",
  });
};

export default function LoginPage(): JSX.Element {
  const session = useSession();

  const { isOpen, open, close } = useModal();

  return (
    <div>
      <h1>로그인테스트창</h1>
      <button type="button" onClick={open}>
        모달 열어보기
      </button>
      <Modal isOpen={isOpen} onClose={close}>
        <p>모달창입니다.</p>
      </Modal>
      {session.status === "authenticated" && (
        <p>{`반갑습니다. ${session.data.user?.name ?? "test"}님.`}</p>
      )}
      {session.status === "authenticated" && (
        <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
          로그아웃
        </button>
      )}
      {session.status === "unauthenticated" && (
        <>
          <Image src={KakaoLoginIMG} alt="" onClick={onLogin("kakao")} />
          <Image src={GoogleLoginSVG} alt="" onClick={onLogin("google")} />
          <Image src={NaverLoginIMG} alt="" onClick={onLogin("naver")} />
        </>
      )}
    </div>
  );
}
