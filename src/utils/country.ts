import {
  City,
  Country,
  DropdownOption,
  State,
} from "@/components/interfaces/common.interface";
import countryData from "./countryinfo.json";

/** Get all countries for dropdown */
export function getCountryOptions(): DropdownOption[] {
  if (!Array.isArray(countryData)) return [];
  return countryData
    .filter(
      (c: Country) => c.common === "India" || c.common === "United States"
    )
    .map((c: Country) => ({
      name: String(`${c.flag} ${c.common}`),
      code: String(c.common),
    }));
}

// - get state by passing country name
export function getStateOptions(countryCode: string): DropdownOption[] {
  if (!Array.isArray(countryData)) return [];
  const country = countryData.find((c: Country) => c.common === countryCode);
  if (!country || !Array.isArray(country.state)) return [];
  return country.state.map((s: State) => ({
    name: String(s.state_name),
    code: String(s.state_name),
  }));
}

// // - get city  by passing country name and statename ------
export function cityOption(
  countryCode: string,
  stateCode: string
): DropdownOption[] {
  if (!Array.isArray(countryData)) return [];
  let country = countryData.find((c: Country) => c.common === countryCode);
  if (!country || !Array.isArray(country.state)) return [];
  let state = country.state.find((s: State) => s.state_name === stateCode);
  if (!state || !Array.isArray(state.cities)) return [];
  let city = state.cities.map((item: City) => {
    return { name: item.name, code: item.name };
  });
  return city;
}
