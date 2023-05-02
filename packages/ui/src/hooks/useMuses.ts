import { useEffect, useState } from "react";
import { GetMusesRequest, Muse, getMuses } from "../services/muse";

export default function useMuses(props: Pick<GetMusesRequest, "pageSize">) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [muses, setMuses] = useState<Muse[]>([]);

  useEffect(() => {
    getMuses({ page, pageSize: props.pageSize }).then((resp) => {
      setPage(resp.page);
      setTotalPages(resp.totalPages);
      setMuses(resp.data);
    });
  }, [page]);

  return {
    page,
    totalPages,
    muses,
    setMuses,
    async onChange(page: number) {
      if (page < 1 || page > totalPages) {
        return;
      }

      const resp = await getMuses({ page, pageSize: props.pageSize });
      setPage(resp.page);
      setTotalPages(resp.totalPages);
      setMuses(resp.data);
    },
  };
}
