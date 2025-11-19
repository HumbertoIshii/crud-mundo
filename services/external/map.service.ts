import { db } from "../../database/database";

export interface Marker {
  lat: number;
  lng: number;
  popup: string;
}

export async function getMapMarkers(): Promise<Marker[]> {
  const [cities]: any = await db.query(`
    SELECT 
      ci.nome AS cityName, 
      ci.latitude, 
      ci.longitude, 
      p.nome AS countryName
    FROM cidades ci
    JOIN paises p ON ci.paisId = p.id
    WHERE ci.latitude IS NOT NULL
      AND ci.longitude IS NOT NULL
      AND ci.latitude != 0
      AND ci.longitude != 0
  `);

  return cities.map((c: any) => ({
    lat: Number(c.latitude),
    lng: Number(c.longitude),
    popup: `${c.cityName}, ${c.countryName}`,
  }));
}