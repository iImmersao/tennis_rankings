import { supabase } from "./supabase";

/////////////
// GET

export const getPlayerHistory = async function (tableName, player, country) {
  let query = supabase
    .from(tableName)
    .select("start_date, ranking, rank_change, points")
    .order("start_date");
};

export const getNumberOfPlayers = async function (tableName, country, date) {
  const data = await getRankings(tableName, country, date);
  return data.length;
};

export const getRankings = async function (
  tableName,
  country,
  date,
  page,
  pageSize
) {
  const pageSizeToUse =
    !pageSize || pageSize === "all" ? Number.MAX_SAFE_INTEGER : pageSize;
  const start = page ? (page - 1) * pageSizeToUse : 0;
  const end = start + pageSizeToUse;

  let query = supabase
    .from(tableName)
    .select(
      "id, start_date, player, country, end_date, ranking, age, points, rank_change, country_ranking, current_tournament"
    )
    .order("ranking");

  if (country !== "all" && country !== "") {
    query.eq("country", country);
  }

  if (date !== "all" && date !== "") {
    query.eq("start_date", date);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Rankings data could not be loaded");
  }

  return data.slice(start, end);
};

export const getPlayerCountries = async function (tableName) {
  let countryTable;
  switch (tableName) {
    case "atp_rankings":
      countryTable = "atp_singles_countries";
      break;
    case "atp_doubles_rankings":
      countryTable = "atp_doubles_countries";
      break;
    case "wta_rankings":
      countryTable = "wta_singles_countries";
      break;
    case "wta_doubles_rankings":
      countryTable = "wta_doubles_countries";
      break;
    default:
      throw new Error("Countries could not be loaded - invalid table name");
  }

  const { data, error } = await supabase
    .from(countryTable)
    .select("country")
    .order("country");

  if (error) {
    console.error(error);
    throw new Error("Countries could not be loaded");
  }

  const countryData = data.reduce((accumulator, current_value) => {
    const { country } = current_value;
    if (!accumulator.includes(country)) {
      accumulator.push(country);
    }
    return accumulator;
  }, []);

  return countryData;
};

export const getAvailableDates = async function (tableName) {
  let dateTable;
  switch (tableName) {
    case "atp_rankings":
      dateTable = "atp_singles_dates";
      break;
    case "atp_doubles_rankings":
      dateTable = "atp_doubles_dates";
      break;
    case "wta_rankings":
      dateTable = "wta_singles_dates";
      break;
    case "wta_doubles_rankings":
      dateTable = "wta_doubles_dates";
      break;
    default:
      throw new Error("Dates could not be loaded - invalid table name");
  }

  const { data, error } = await supabase
    .from(dateTable)
    .select("start_date")
    .order("start_date", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Dates could not be loaded");
  }

  const dates = data.reduce((accumulator, current_value) => {
    const { start_date } = current_value;
    if (!accumulator.includes(start_date)) {
      accumulator.push(start_date);
    }
    return accumulator;
  }, []);

  return dates;
};

export async function getFlag(countryCode) {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/alpha/" + countryCode + "?fields=flags"
    );
    if (typeof res === "undefined") {
      console.log("Failed to get country flag JSON info");
      return "";
    }
    const flagData = await res.json();
    if (typeof flagData === "undefined") {
      console.log("Didn't find flag info");
      return "";
    }
    const { flags } = flagData;
    if (typeof flags === "undefined") {
      console.log("Did not find the flag URL for " + countryCode);
      return "";
    }
    const { png, svg, alt } = flags;
    return png;
  } catch {
    throw new Error("Could not fetch flag for country code " + countryCode);
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

/////////////
// UPDATE

/////////////
// DELETE
