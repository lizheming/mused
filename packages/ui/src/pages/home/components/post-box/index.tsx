import React from "react";

export default function PostBox() {
  return (
    <div className="post-box">
      <form className="pure-form">
        <fieldset className="pure-group">
          <textarea
            rows={5}
            className="pure-input-1"
            placeholder="请输入内容..."
          ></textarea>
        </fieldset>
        <button
          type="submit"
          className="pure-button pure-input-1-5 pure-button-primary"
        >
          发布
        </button>
      </form>
    </div>
  );
}
