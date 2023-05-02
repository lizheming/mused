import Layout from "../../components/layout";
import MuseList from "./components/muse-list";
import Pagination from "./components/pagination";
import PostBox from "./components/post-box";
import LoginPanel from "./components/login-panel";

import useUserInfo from "../../hooks/useUserInfo";
import useMuses from "../../hooks/useMuses";

import "./style.css";
import { Muse } from "../../services/muse";
import { useCallback } from "react";

export default function Home() {
  const { userInfo, isLogin, userLogin, userLogout } = useUserInfo();
  const {
    muses,
    page,
    totalPages,
    setMuses,
    onChange: onNavigate,
  } = useMuses({ pageSize: 25 });

  const onPost = useCallback(
    (muse: Muse) => setMuses([muse, ...muses]),
    [muses]
  );

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
        {isLogin ? <PostBox onPost={onPost} /> : null}
        <div className="list" style={{ marginTop: 20 }}>
          <MuseList data={muses} />
          {totalPages > 1 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onNavigate={onNavigate}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
