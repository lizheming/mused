import React from "react";
import MuseItem from "../muse-item";

import { Muse } from "../../../../services/muse";

import "./style.css";

interface MuseListProps {
  data?: Muse[];
}
export default function MuseList(props: MuseListProps) {
  return (
    <ul>
      {props.data?.map((muse, k) => (
        <MuseItem key={k} data={muse} />
      ))}
    </ul>
  );
}
