import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  LoginParams,
  UpdateUserInfoParams,
  User,
  registerUser,
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
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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
        {
          text: "注册",
          action() {
            setIsRegisterOpen(true);
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

  const onUpdateUserProfileSubmit = useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      display_name: "",
      url: "",
      password: "",
      password_again: "",
    };

    for (const [key, value] of formData.entries()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      data[key] = value;
    }
    if (
      data.password &&
      data.password_again &&
      data.password !== data.password_again
    ) {
      return alert("passwords don't match");
    }

    try {
      setLoging(true);
      await onUpdateUserProfile(
        Object.assign({}, data, { password_again: undefined })
      );
    } catch (e) {
      alert((e as any).message || "更新失败");
    } finally {
      setLoging(false);
    }
  }, []);

  const onRegisterSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = {
        display_name: "",
        email: "",
        url: "",
        password: "",
        password_again: "",
      };
      for (const [key, value] of formData.entries()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data[key] = value;
      }

      if (data.password !== data.password_again) {
        return alert("passwords don't match");
      }

      try {
        setLoging(true);
        await registerUser(data);
        setIsOpen(true);
        setIsRegisterOpen(false);
      } catch (e) {
        alert((e as any).message || "注册失败");
      } finally {
        setLoging(false);
      }
    },
    []
  );

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
        <form
          className="pure-form pure-form-stacked"
          onSubmit={onUpdateUserProfileSubmit}
        >
          <fieldset>
            <legend>个人资料</legend>
            <label htmlFor="aligned-display-name">昵称</label>
            <input
              type="text"
              id="aligned-display-name"
              name="display_name"
              defaultValue={userInfo?.display_name}
            />
            <label htmlFor="aligned-url">个人主页地址</label>
            <input
              type="text"
              id="aligned-url"
              name="url"
              defaultValue={userInfo?.url}
            />
            <button
              type="submit"
              className="pure-button pure-button-primary"
              disabled={loging}
            >
              更新我的档案
            </button>
          </fieldset>

          <fieldset>
            <legend>密码修改</legend>
            <label htmlFor="aligned-password">密码</label>
            <input type="password" id="aligned-password" name="password" />
            <label htmlFor="aligned-password-again">再次输入密码</label>
            <input
              type="password"
              id="aligned-password-again"
              name="password_again"
            />
            <button
              type="submit"
              className="pure-button pure-button-primary"
              disabled={loging}
            >
              更新密码
            </button>
          </fieldset>

          <fieldset>
            <legend>OpenAPI</legend>
            {userInfo?.open_id ? (
              <div className="pure-control-group">
                <textarea className="pure-input-1" readOnly value={openAPI} />
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

      <Dialog
        onClose={() => setIsRegisterOpen(!isRegisterOpen)}
        visible={isRegisterOpen}
      >
        <form
          className="pure-form pure-form-aligned"
          onSubmit={onRegisterSubmit}
        >
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="aligned-display-name">昵称</label>
              <input
                type="text"
                id="aligned-display-name"
                name="display_name"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-email">邮箱</label>
              <input type="email" id="aligned-email" name="email" />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-url">个人网站</label>
              <input type="url" id="aligned-url" name="url" />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-password">密码</label>
              <input type="password" id="aligned-password" name="password" />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-password-again">再次输入密码</label>
              <input
                type="password"
                id="aligned-password-again"
                name="password_again"
              />
            </div>
            <div className="pure-controls">
              <button
                type="submit"
                className="pure-button pure-button-primary"
                disabled={loging}
              >
                注册
              </button>
            </div>
          </fieldset>
        </form>
      </Dialog>
    </>
  );
}
