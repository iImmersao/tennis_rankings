import DropDownFilter from "@/app/_components/DropDownFilter";
import Pagination from "./Pagination";

import {
  getAvailableDates,
  getPlayerCountries,
  getNumberOfPlayers,
} from "../_lib/data-service";

async function PlayerListSelector({ tableName, country, date, pageSize }) {
  const numPlayers = await getNumberOfPlayers(tableName, country, date);
  const totalPages =
    numPlayers % pageSize === 0
      ? numPlayers / pageSize
      : numPlayers / pageSize + 1;

  const countries = (await getPlayerCountries(tableName)) ?? [];
  const dates = (await getAvailableDates(tableName)) ?? [];
  const pageSizes = [10, 25, 50, 100];

  return (
    <div>
      <div className="grid min-w-full sm:grid-cols-3 md:grid-cols-3 gap-2 lg:gap-4 xl:gap-8">
        <div className="flex justify-start mb-2">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-1 lg:gap-2 xl:gap3">
            <div className="flex justify-end mb-2">
              <span>Players per page:</span>
            </div>
            <div className="flex justify-start mb-2">
              <DropDownFilter
                defaultValue={numPlayers}
                options={pageSizes}
                name={"pageSize"}
                clearParams={false}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-1 lg:gap-2 xl:gap3">
            <div className="flex justify-end mb-2">
              <span>Week:</span>
            </div>
            <div className="flex justify-start mb-2">
              <DropDownFilter
                defaultValue={date}
                options={dates}
                name={"date"}
                clearParams={true}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-1 lg:gap-2 xl:gap3">
            <div className="flex justify-end mb-2">
              <span>Country:</span>
            </div>
            <div className="flex justify-start mb-2">
              <DropDownFilter
                defaultValue={country}
                options={countries}
                name={"country"}
                clearParams={true}
              />
            </div>
          </div>
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default PlayerListSelector;
