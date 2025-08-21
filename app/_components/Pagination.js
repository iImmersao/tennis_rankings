"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getPageNumbers(current, total, maxVisible) {
  const pages = [];
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, current + half);

  if (current <= half) {
    start = 2;
    end = Math.min(total - 1, maxVisible);
  } else if (current > total - half) {
    start = Math.max(2, total - maxVisible + 1);
    end = total - 1;
  }

  pages.push(1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  if (total > 1) pages.push(total);

  return pages;
}

export default function Pagination({
  page,
  totalPages,
  pageSize,
  onChange,
  maxVisible = 10,
}) {
  const pathname = usePathname();

  const pages = getPageNumbers(
    page ? parseInt(page) : 1,
    totalPages,
    maxVisible
  );

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {/* Prev button */}
      {page > 1 && (
        <Button filter={page - 1} activeFilter={page} onChange={onChange}>
          Prev
        </Button>
      )}

      {/* Numbered pages */}
      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`ellipsis-${idx}`}>…</span>
        ) : (
          <Button key={p} filter={p} activeFilter={page} onChange={onChange}>
            {p}
          </Button>
        )
      )}

      {/* Next button */}
      {page < totalPages && (
        <Button filter={page + 1} activeFilter={page} onChange={onChange}>
          Next
        </Button>
      )}
    </div>
  );
}

function Button({ children, filter, activeFilter, onChange }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => onChange("page", filter)}
    >
      {filter === activeFilter ? <strong>{children}</strong> : children}
    </button>
  );
}
