"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function DropDownFilter({ defaultValue, options, name, clearParams }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get(name) ?? "all";

  function handleFilter(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (clearParams) {
      const keysToDelete = Array.from(params.keys());
      for (const key of keysToDelete) {
        params.delete(key);
      }
    }
    if (e.target.value !== "") {
      params.set(name, e.target.value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <form action={handleFilter}>
        <select
          name={name}
          value={activeFilter}
          onChange={(e) => {
            handleFilter(e);
          }}
        >
          <option value="">-- Select a value --</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default DropDownFilter;
