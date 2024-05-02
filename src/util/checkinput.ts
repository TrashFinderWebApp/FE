export const checkEmail = (email: string): boolean => {
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegExp.test(email);
};

export const checkPassword = (password: string): boolean => {
  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\s]).{8,15}$/;
  return passwordRegExp.test(password);
};

export const checkNickname = (nickname: string): boolean => {
  const nicknameRegExp = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/;
  return nicknameRegExp.test(nickname);
};
