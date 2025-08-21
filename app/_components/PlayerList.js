import PlayerCard from "@/app/_components/PlayerCard";
import {
  getRankings,
  getAvailableDates,
  getPlayerCountries,
  getNumberOfPlayers,
} from "../_lib/data-service";
import PlayerListSelector from "./PlayerListSelector";

async function PlayerList({ searchParams, tableName }) {
  const dates = (await getAvailableDates(tableName)) ?? [];
  const countries = (await getPlayerCountries(tableName)) ?? [];
  const awaitedSearchParams = await searchParams;
  const country = awaitedSearchParams?.country ?? "all";
  const date = awaitedSearchParams?.date ?? dates[0];
  console.log("Page number from params = " + awaitedSearchParams.page);
  const page = awaitedSearchParams.page
    ? parseInt(awaitedSearchParams.page)
    : 1;
  const pageSize = parseInt(awaitedSearchParams.pageSize);

  const numPlayers = await getNumberOfPlayers(tableName, country, date);
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
        country={country}
        date={date}
        page={page}
        pageSize={pageSize}
        countries={countries}
        dates={dates}
        numPlayers={numPlayers}
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
