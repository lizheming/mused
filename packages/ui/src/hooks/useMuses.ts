import { useEffect, useState } from "react";
import { getMuses } from "../services/muse";

export default function useMuses() {
  const [muses, setMuses] = useState([]);

  useEffect(() => {
    getMuses().then(setMuses);
  }, []);

  return {
    muses,
  };
}
