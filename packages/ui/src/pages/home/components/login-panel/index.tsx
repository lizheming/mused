import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { LoginParams, User } from "../../../../services/user";

interface LoginPanelProps {
  userInfo: User | null;
  isLogin: boolean;
  onLogin: (data: LoginParams) => void;
  onLogout: () => void;
}
export default function LoginPanel({
  userInfo,
  isLogin,
  onLogin,
  onLogout,
}: LoginPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loging, setLoging] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isLogin]);

  const list = isLogin
    ? [
        {
          text: userInfo?.display_name,
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
