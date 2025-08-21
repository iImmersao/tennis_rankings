import { pl } from "date-fns/locale";
import { getFlag } from "../_lib/data-service";
import PlayerLink from "./PlayerLink";

async function PlayerCard({ playerRec, background }) {
  const {
    id,
    start_date,
    player,
    country,
    end_date,
    ranking,
    age,
    points,
    rank_change,
    country_ranking,
  } = playerRec;

  const flag =
    country === "Country" || country === "" ? "" : await getFlag(country);

  return (
    <div
      className={
        background !== null ? background : "odd:bg-green-500 even:bg-green-800"
      }
    >
      <div className="grid sm:grid-cols-8 md:grid-cols-8 gap-1 lg:gap-2 xl:gap-3">
        <div className="flex items-center mb-2">{ranking}</div>

        <div className="flex items-center mb-2">
          {flag !== "" ? <img src={flag} width="30" height="20" /> : ""}
        </div>

        <div className="flex items-center mb-2">
          <PlayerLink playerName={player} country={country} />
        </div>

        <div className="flex items-center mb-2">{age}</div>

        <div className="flex items-center mb-2">{country}</div>

        <div className="flex items-center mb-2">{country_ranking}</div>

        <div className="flex items-center mb-2">{points}</div>

        <div className="flex items-center mb-2">
          {rank_change ? rank_change : ""}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
