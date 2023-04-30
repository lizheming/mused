import React from "react";
import MuseItem from "../muse-item";

import './style.css';

export default function MuseList() {
  const data = [1, 2, 3, 4, 5];
  return (
    <ul>
      {data.map((_, k) => (
        <MuseItem key={k} />
      ))}
    </ul>
  );
}
