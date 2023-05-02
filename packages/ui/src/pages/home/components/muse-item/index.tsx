import { useMemo } from "react";
import { Muse } from "../../../../services/muse";

import "./style.css";

interface MuseItemProps {
  data?: Muse;
}

export default function MuseItem(props: MuseItemProps) {
  const time = useMemo(() => {
    if (!props.data?.time) {
      return;
    }

    const date = new Date(props.data.time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${mins}:${seconds}`;
  }, [props.data?.time]);

  if (!props.data) {
    return null;
  }

  return (
    <li>
      <div
        className="item-text"
        dangerouslySetInnerHTML={{ __html: props.data.content }}
      />
      <div className="item-bottom">
        <div className="item-meta">
          <span>{time}</span>
          <span> • </span>
          <span>来自「{props.data.origin}」</span>
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
