"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("page") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("page", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          filter={i + 1}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
          key={i + 1}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}

function Button({ children, filter, handleFilter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
