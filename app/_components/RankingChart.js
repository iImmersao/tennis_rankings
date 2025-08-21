import WeeklyPointsChart from "@/app/_components/WeeklyPointsChart";
import { getPlayerHistory } from "../_lib/data-service";

async function RankingChart({ searchParams, tableName }) {
  const awaitedSearchParams = await searchParams;
  const player = awaitedSearchParams?.player ?? "";
  const country = awaitedSearchParams?.country ?? "";

  if (player === "" || country === "") {
    return;
  }

  const rankingHistory = await getPlayerHistory(tableName, player, country);

  return (
    <div>
      <div>
        <span>
          {player} {country}
        </span>
      </div>
      <div>
        <span>Points:</span>
        <WeeklyPointsChart rankingHistory={rankingHistory} type={"points"} />
      </div>
      <div>
        <span>Rank:</span>
        <WeeklyPointsChart
          rankingHistory={rankingHistory}
          type={"ranking"}
          domain={[1, "auto"]}
        />
      </div>
    </div>
  );
}

export default RankingChart;
