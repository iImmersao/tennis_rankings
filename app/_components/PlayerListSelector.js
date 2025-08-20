"use client";

import DropDownFilter from "@/app/_components/DropDownFilter";
import Pagination from "./Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import ResetFilters from "./ResetFilters";

// List the filter keys you support:
const KEYS = ["pageSize", "date", "country"];
const pageSizes = [10, 25, 50, 100];

function parseFromString(qsString) {
  const sp = new URLSearchParams(qsString);
  const obj = {};
  for (const k of KEYS) obj[k] = sp.get(k) ?? "";
  return obj;
}

function PlayerListSelector({
  country,
  date,
  pageSize,
  countries,
  dates,
  numPlayers,
}) {
  const totalPages =
    numPlayers % pageSize === 0
      ? numPlayers / pageSize
      : numPlayers / pageSize + 1;

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const spString = useMemo(() => sp.toString(), [sp]); // stringify snapshot

  // Local source of truth for the UI
  const [filters, setFilters] = useState(() => parseFromString(spString));

  // Sync *only when the actual query string content changes*
  useEffect(() => {
    setFilters((prev) => {
      const next = parseFromString(spString);
      // shallow compare; update only when different
      for (const k of KEYS) {
        if ((prev[k] ?? "") !== (next[k] ?? "")) return next;
      }
      return prev;
    });
  }, [spString]);

  // Build URL from local state
  function toUrl(next) {
    const params = new URLSearchParams();
    for (const k of KEYS) {
      const v = next[k];
      if (v) params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function updateFilter(name, value) {
    setFilters((prev) => {
      const next = { ...prev, [name]: value };
      router.replace(toUrl(next), { scroll: false });
      return next;
    });
  }

  function resetAll() {
    const cleared = KEYS.reduce((a, k) => ((a[k] = ""), a), {});
    setFilters(cleared);
    router.replace(pathname, { scroll: false }); // remove all params
    router.refresh(); // force server data to refetch immediately
  }

  return (
    <div>
      <div className="grid min-w-full sm:grid-cols-4 md:grid-cols-4 gap-2 lg:gap-4 xl:gap-8">
        <div className="flex justify-start mb-2">
          <DropDownFilter
            label={"Players per page:"}
            name={"pageSize"}
            value={filters.pageSize}
            options={pageSizes}
            onChange={updateFilter}
          />
        </div>
        <div className="flex justify-center mb-2">
          <DropDownFilter
            label={"Week:"}
            name={"date"}
            value={filters.date}
            options={dates}
            onChange={updateFilter}
          />
        </div>
        <div className="flex justify-center mb-2">
          <DropDownFilter
            label={"Country:"}
            name={"country"}
            value={filters.country}
            options={countries}
            onChange={updateFilter}
          />
        </div>

        <div className="flex justify-end mb-2">
          <ResetFilters onReset={resetAll}>Reset</ResetFilters>
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default PlayerListSelector;
