import Spinner from "@/app/_components/Spinner";
import RankingChart from "@/app/_components/RankingChart";
import { Suspense } from "react";

export default function Page({ searchParams }) {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <RankingChart searchParams={searchParams} tableName={"atp_doubles_rankings"} />
      </Suspense>
    </div>
  );
}
