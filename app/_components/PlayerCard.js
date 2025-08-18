import { UsersIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function PlayerCard({ playerRec, background }) {
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

  return (
    <div
      className={
        background !== null ? background : "odd:bg-green-500 even:bg-green-800"
      }
    >
      <div className="grid sm:grid-cols-7 md:grid-cols-7 gap-1 lg:gap-2 xl:gap-3">
        <div className="flex items-center mb-2">{ranking}</div>

        <div className="flex items-center mb-2">{player}</div>

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
