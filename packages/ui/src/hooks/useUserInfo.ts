import { useEffect, useState } from "react";
import { getUserInfo, login, LoginParams, logout } from "../services/user";

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo);
  }, []);

  return {
    userInfo,
    isLogin: userInfo && userInfo.email,
    async userLogin(params: LoginParams) {
      const userInfo = await login(params);
      setUserInfo(userInfo);
    },
    userLogout() {
      logout();
      setUserInfo(null);
    },
  };
}
