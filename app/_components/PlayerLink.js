"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PlayerLink({ playerName, country }) {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={`${pathname}/player_history?player=${playerName}&country=${country}`}
      >
        {playerName}
      </Link>
    </div>
  );
}
