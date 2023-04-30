import './style.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNavigate,
}: PaginationProps) {
  const FIRST_PAGE = 1;
  const LAST_PAGE = totalPages;
  const MAX_PAGES = 3;

  const hasPrevArrow = currentPage > FIRST_PAGE;
  const hasNextArrow = currentPage < LAST_PAGE;
  const hasPrevEllipsis = currentPage > FIRST_PAGE + MAX_PAGES + 1;
  const hasNextEllipsis = currentPage < LAST_PAGE - MAX_PAGES - 1;

  const rangePageStart = Math.max(FIRST_PAGE, currentPage - MAX_PAGES);
  const rangePageEnd = Math.min(LAST_PAGE, currentPage + MAX_PAGES);
  const rangePages = Array.from(
    { length: rangePageEnd - rangePageStart + 1 },
    (_, k) => rangePageStart + k
  );

  return (
    <div className="pagination">
      <ol className="page-navigator">
        {hasPrevArrow ? (
          <li className="prev">
            <a href="#" onClick={() => onNavigate(currentPage - 1)}>
              〈
            </a>
          </li>
        ) : null}
        {rangePageStart !== FIRST_PAGE ? (
          <li>
            <a href="#" onClick={() => onNavigate(FIRST_PAGE)}>
              {FIRST_PAGE}
            </a>
          </li>
        ) : null}
        {hasPrevEllipsis ? (
          <li>
            <span>...</span>
          </li>
        ) : null}

        {rangePages.map((page) => (
          <li key={page} className={page === currentPage ? "current" : ""}>
            <a href="#" onClick={() => onNavigate(page)}>
              {page}
            </a>
          </li>
        ))}

        {hasNextEllipsis ? (
          <li>
            <span>...</span>
          </li>
        ) : null}
        {rangePageEnd !== LAST_PAGE ? (
          <li>
            <a href="#" onClick={() => onNavigate(LAST_PAGE)}>
              {LAST_PAGE}
            </a>
          </li>
        ) : null}
        {hasNextArrow ? (
          <li className="next">
            <a href="#" onClick={() => onNavigate(currentPage + 1)}>
              〉
            </a>
          </li>
        ) : null}
      </ol>
    </div>
  );
}
