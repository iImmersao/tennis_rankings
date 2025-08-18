import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

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
  const start = page ? (page - 1) * pageSizeToUse : 1;
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
  const { data, error } = await supabase
    .from(tableName)
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
  const { data, error } = await supabase
    .from(tableName)
    .select("start_date")
    .order("start_date");

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
