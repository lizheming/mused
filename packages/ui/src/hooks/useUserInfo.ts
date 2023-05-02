import { useEffect, useState } from "react";
import {
  getUserInfo,
  login,
  LoginParams,
  logout,
  User,
} from "../services/user";

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo);
  }, []);

  return {
    userInfo,
    isLogin: Boolean(userInfo && userInfo.email),
    async userLogin(params: LoginParams) {
      const userInfo = await login(params);

      window.TOKEN = userInfo.token;
      sessionStorage.TOKEN = userInfo.token;
      setUserInfo(userInfo);
    },
    userLogout() {
      logout();
      setUserInfo(null);
    },
  };
}
