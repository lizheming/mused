import React from "react";

import './style.css';

export default function MuseItem() {
  return (
    <li>
      <div className="item-text">
        <p>Hello World!</p>
      </div>
      <div className="item-bottom">
        <div className="item-meta">
          <span>2月26日</span>
          <span> • </span>
          <span>来自「微信」</span>
        </div>
        {/* <div className="item-like">
          <span>
            <i className="digu icon-like-line"></i>0<span></span>
          </span>
        </div> */}
      </div>
    </li>
  );
}
