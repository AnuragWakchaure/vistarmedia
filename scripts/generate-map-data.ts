import fs from "fs";
import { geoMercator, geoPath } from "d3-geo";

const geojson = JSON.parse(fs.readFileSync("d:/vistar-web/public/data/maharashtra.geojson", "utf8"));

const width = 900;
const height = 680;

// Set up Mercator projection fitted to the exact bounding box of Maharashtra
const projection = geoMercator().fitExtent([[45, 45], [width - 45, height - 45]], geojson);
const pathGenerator = geoPath().projection(projection);

const districts = geojson.features.map((f: any, i: number) => {
  const d = pathGenerator(f);
  const name = f.properties.district || f.properties.District || f.properties.dtname || `District ${i}`;
  const dtCode = f.properties.dt_code || String(i);
  return {
    id: dtCode,
    name,
    path: d,
  };
});

const LOCATIONS = [
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, creatorCount: 50, countDisplay: "50+", category: "Entertainment & Fashion", description: "Maharashtra's media, Bollywood, fashion & creator headquarters." },
  { name: "Pune", lat: 18.5204, lon: 73.8567, creatorCount: 45, countDisplay: "45+", category: "Tech & Urban Lifestyle", description: "Youth, tech, automobile & urban lifestyle Marathi creator ecosystem." },
  { name: "Nashik", lat: 19.9975, lon: 73.7898, creatorCount: 25, countDisplay: "25+", category: "Agriculture & Food", description: "Agri-tech, winery, culinary & North Maharashtra regional voice." },
  { name: "Ahilyanagar", lat: 19.0948, lon: 74.7480, creatorCount: 20, countDisplay: "20+", category: "Rural Agriculture & Machinery", description: "Sugar belt, farming machinery, dairy & rural economy storytellers." },
  { name: "Chhatrapati Sambhajinagar", lat: 19.8762, lon: 75.3433, creatorCount: 20, countDisplay: "20+", category: "Regional Commerce", description: "Marathwada regional commerce, industrial hub & heritage tourism." },
  { name: "Kolhapur", lat: 16.7050, lon: 74.2433, creatorCount: 20, countDisplay: "20+", category: "Cultural & Vernacular Reach", description: "Historic cultural capital, sugarcane industry & South Maharashtra powerhouse." },
  { name: "Nagpur", lat: 21.1458, lon: 79.0882, creatorCount: 25, countDisplay: "25+", category: "Vidarbha Regional Hub", description: "Vidarbha commercial center, logistics hub & central India gateway." },
  { name: "Satara", lat: 17.6805, lon: 74.0183, creatorCount: 15, countDisplay: "15+", category: "Agri-Business & Dairy", description: "Western Ghats agriculture, tourism & dairy farming influencers." },
  { name: "Sangli", lat: 16.8524, lon: 74.5815, creatorCount: 15, countDisplay: "15+", category: "Agri-Business & Dairy", description: "Turmeric capital, sugar cooperatives & Krishna river basin network." },
];

const projectedLocations = LOCATIONS.map((loc) => {
  const projected = projection([loc.lon, loc.lat]);
  const [x, y] = projected || [0, 0];
  return {
    ...loc,
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
  };
});

// Output code file
const output = `// Geographically accurate Maharashtra GeoJSON projected SVG paths
// Generated from official Maharashtra GeoJSON using D3 Mercator Projection
// Projection bounds: 900 x 680

import { geoMercator } from "d3-geo";

export interface MaharashtraDistrictPath {
  id: string;
  name: string;
  path: string;
}

export interface CreatorLocationItem {
  _id?: string;
  name: string;
  lat: number;
  lon: number;
  creatorCount: number;
  countDisplay: string;
  category: string;
  description?: string;
  x?: number;
  y?: number;
  active?: boolean;
  displayOrder?: number;
}

export const MAHARASHTRA_VIEWBOX = "0 0 ${width} ${height}";
export const MAP_WIDTH = ${width};
export const MAP_HEIGHT = ${height};

export const MAHARASHTRA_DISTRICTS: MaharashtraDistrictPath[] = ${JSON.stringify(districts, null, 2)};

export const DEFAULT_CREATOR_LOCATIONS: CreatorLocationItem[] = ${JSON.stringify(projectedLocations, null, 2)};

// Projection scale and translate constants matching d3.geoMercator fitExtent
// for instant synchronous projection without loading full GeoJSON at runtime:
const SCALE = ${projection.scale()};
const TRANSLATE_X = ${projection.translate()[0]};
const TRANSLATE_Y = ${projection.translate()[1]};

export function projectCoordinates(lon: number, lat: number): [number, number] {
  const proj = geoMercator()
    .scale(SCALE)
    .translate([TRANSLATE_X, TRANSLATE_Y]);
  
  const point = proj([lon, lat]);
  if (!point) return [0, 0];
  return [Number(point[0].toFixed(2)), Number(point[1].toFixed(2))];
}
`;

const dir = "d:/vistar-web/lib/data";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync("d:/vistar-web/lib/data/maharashtra-geo.ts", output);
console.log("Generated lib/data/maharashtra-geo.ts with", districts.length, "districts and default locations!");
