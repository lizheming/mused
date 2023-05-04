import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  LoginParams,
  UpdateUserInfoParams,
  User,
} from "../../../../services/user";

import "./style.css";
interface LoginPanelProps {
  userInfo: User | null;
  isLogin: boolean;
  onLogin: (data: LoginParams) => void;
  onLogout: () => void;
  onUpdateUserProfile: (data: UpdateUserInfoParams) => void;
}
export default function LoginPanel({
  userInfo,
  isLogin,
  onLogin,
  onLogout,
  onUpdateUserProfile,
}: LoginPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loging, setLoging] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isLogin]);

  const list = isLogin
    ? [
        {
          text: userInfo?.display_name,
          action() {
            setIsProfileOpen(true);
          },
        },
        {
          text: "退出",
          action: onLogout,
        },
      ]
    : [
        {
          text: "登录",
          action() {
            setIsOpen(true);
          },
        },
      ];

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = {
        email: "",
        password: "",
      };
      for (const [key, value] of formData.entries()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data[key] = value;
      }
      try {
        setLoging(true);
        await onLogin(data);
        setIsOpen(false);
      } catch (e) {
        alert((e as any).message || "登录失败");
      } finally {
        setLoging(false);
      }
    },
    []
  );

  const onGenerateOpenId = useCallback(async () => {
    try {
      setGenerating(true);
      await onUpdateUserProfile({ type: "open_id" });
    } catch (e) {
      alert((e as any).message || "生成失败");
    } finally {
      setGenerating(false);
    }
  }, []);

  const openAPI = useMemo(
    () =>
      location.protocol +
      "//" +
      location.host +
      "/api/muse?openId=" +
      userInfo?.open_id,
    [userInfo]
  );
  const preText = useMemo(() => {
    if (!userInfo?.open_id) {
      return "";
    }
    return `POST ${openAPI}
Content-type: application/json
{
  "content": "Hello Muse from ${location.protocol + "//" + location.host}"
}
`;
  }, [userInfo?.open_id, openAPI]);

  return (
    <>
      <div className="pure-menu pure-menu-horizontal" style={{ width: "auto" }}>
        <ul className="pure-menu-list">
          {list.map(({ text, action }, idx) => (
            <li className="pure-menu-item" key={idx}>
              <a
                href="#"
                className="pure-menu-link"
                onClick={typeof action === "function" ? action : undefined}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        onClose={() => setIsProfileOpen(!isProfileOpen)}
        visible={isProfileOpen}
      >
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>OpenAPI</legend>
            {userInfo?.open_id ? (
              <div className="pure-control-group">
                <textarea className="pure-input-1" readOnly>
                  {openAPI}
                </textarea>
              </div>
            ) : null}
            <button
              type="button"
              className="pure-button pure-button-primary"
              onClick={onGenerateOpenId}
              disabled={generating}
            >
              {userInfo?.open_id ? "重置" : "生成"}
            </button>
          </fieldset>
          {preText ? (
            <fieldset>
              <pre className="pre-openapi">{preText}</pre>
            </fieldset>
          ) : null}
          {/* <fieldset>
            <legend>OpenAPI</legend>
            <div className="pure-control-group">
              <textarea className="pure-input-1" readOnly></textarea>
            </div>
            <button
              type="submit"
              className="pure-button pure-button-primary"
              disabled={loging}
            >
              重置
            </button>
          </fieldset> */}
        </form>
      </Dialog>
      <Dialog onClose={() => setIsOpen(!isOpen)} visible={isOpen}>
        <form className="pure-form pure-form-aligned" onSubmit={onSubmit}>
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="aligned-email">邮箱</label>
              <input type="email" id="aligned-email" name="email" />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-password">密码</label>
              <input type="password" id="aligned-password" name="password" />
            </div>
            <div className="pure-controls">
              <button
                type="submit"
                className="pure-button pure-button-primary"
                disabled={loging}
              >
                登录
              </button>
            </div>
          </fieldset>
        </form>
      </Dialog>
    </>
  );
}
