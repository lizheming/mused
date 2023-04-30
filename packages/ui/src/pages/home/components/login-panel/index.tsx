import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { useState } from "react";

export default function LoginPanel({ userInfo, isLogin, onLogin, onLogout}) {
  const [isOpen, setIsOpen] = useState(false);


  const list = isLogin
    ? [
        {
          text: userInfo.nickname,
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
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="aligned-email">Email Address</label>
              <input
                type="email"
                id="aligned-email"
                placeholder="Email Address"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="aligned-password">Password</label>
              <input
                type="password"
                id="aligned-password"
                placeholder="Password"
              />
            </div>
            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </Dialog>
    </>
  );
}
