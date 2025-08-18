import PlayerCard from "@/app/_components/PlayerCard";
import { getRankings } from "../_lib/data-service";
import PlayerListSelector from "./PlayerListSelector";

async function PlayerList({ searchParams, tableName }) {
  const awaitedSearchParams = await searchParams;
  const country = awaitedSearchParams?.country ?? "all";
  const date = awaitedSearchParams?.date ?? "all";
  const page = parseInt(awaitedSearchParams.page);
  const pageSize = parseInt(awaitedSearchParams.pageSize);

  const players = await getRankings(tableName, country, date, page, pageSize);

  const headings = {
    id: 0,
    start_date: null,
    player: "Player",
    country: "Country",
    end_date: null,
    ranking: "Ranking",
    age: "Age",
    points: "Points",
    rank_change: "Ranking Change",
    country_ranking: "Country Ranking",
  };

  if (!players.length) return null;

  return (
    <div>
      <PlayerListSelector
        tableName={tableName}
        country={country}
        date={date}
        pageSize={pageSize}
      />

      <PlayerCard
        playerRec={headings}
        background={"odd:bg-blue-500 even:bg-blue-800"}
        key={0}
      />
      <div className="grid min-w-full sm:grid-cols-1 md:grid-cols-1 gap-0 lg:gap-0 xl:gap-0">
        {players.map((player) => (
          <PlayerCard
            playerRec={player}
            background={"odd:bg-green-500 even:bg-green-800"}
            key={player.id}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
