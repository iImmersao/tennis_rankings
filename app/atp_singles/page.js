import { Suspense } from "react";
import PlayerList from "@/app/_components/PlayerList";
import Spinner from "@/app/_components/Spinner";

export default function Page({ searchParams }) {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <PlayerList searchParams={searchParams} tableName={"atp_rankings"} />
      </Suspense>
    </div>
  );
}
