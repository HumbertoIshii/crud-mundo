import fetch from "node-fetch";

interface RestCountryResult {
  name: { common: string; official?: string };
  population?: number;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol?: string } };
  flags?: { png?: string; svg?: string };
  cca2?: string; // ISO2
  cca3?: string; // ISO3
  region?: string;
  continents?: string[];
}

export async function lookupCountryByName(name: string): Promise<{
  found: boolean;
  population?: number;
  languages?: string[];
  currencies?: string[];
  flagUrl?: string;
  iso2?: string;
  region?: string;
  raw?: RestCountryResult;
}> {
  if (!name || !name.trim()) return { found: false };

  const q = encodeURIComponent(name.trim());
  const urls = [
    `https://restcountries.com/v3.1/name/${q}?fullText=true`,
    `https://restcountries.com/v3.1/name/${q}`
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data: RestCountryResult[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) continue;
      const country = data[0];

      const population = country.population ?? undefined;
      const languages = country.languages ? Object.values(country.languages) : [];
      const currencies = country.currencies ? Object.keys(country.currencies) : [];
      const flagUrl = country.flags?.png ?? country.flags?.svg ?? undefined;
      const iso2 = country.cca2 ?? undefined;
      const region = country.region ?? country.continents?.[0] ?? undefined;

      return {
        found: true,
        population,
        languages,
        currencies,
        flagUrl,
        iso2,
        region,
        raw: country,
      };
    } catch (err) {
      continue;
    }
  }

  return { found: false };
}