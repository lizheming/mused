import { useState } from "react";
import Layout from "../../components/layout";
import MuseList from "./components/muse-list";
import Pagination from "./components/pagination";
import PostBox from "./components/post-box";
import LoginPanel from "./components/login-panel";

import useUserInfo from "../../hooks/useUserInfo";
import useMuses from "../../hooks/useMuses";

import "./style.css";

export default function Home() {
  const { userInfo, isLogin, userLogin, userLogout } = useUserInfo();
  const { muses, } = useMuses();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Layout>
      <header>
        <h2>Muse!</h2>

        <LoginPanel
          userInfo={userInfo}
          isLogin={isLogin}
          onLogin={userLogin}
          onLogout={userLogout}
        />
      </header>
      <div className="main">
        {isLogin ? <PostBox /> : null}
        <div className="list" style={{ marginTop: 20 }}>
          <MuseList data={muses} />
          <Pagination
            totalPages={6}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
}
