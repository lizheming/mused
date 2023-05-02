import { ReactNode } from "react";
import "normalize.css";
import "purecss";
import "./style.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="page">{children}</div>;
}
