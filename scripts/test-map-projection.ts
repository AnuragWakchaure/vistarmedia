import fs from "fs";
import { geoMercator, geoPath } from "d3-geo";

const geojson = JSON.parse(fs.readFileSync("d:/vistar-web/public/data/maharashtra.geojson", "utf8"));

const width = 900;
const height = 680;

// Set up Mercator projection fitted to the exact bounding box of Maharashtra
const projection = geoMercator().fitExtent([[40, 40], [width - 40, height - 40]], geojson);
const pathGenerator = geoPath().projection(projection);

const districts = geojson.features.map((f: any, i: number) => {
  const d = pathGenerator(f);
  const name = f.properties.district || f.properties.District || f.properties.dtname || `District ${i}`;
  return {
    id: f.properties.dt_code || String(i),
    name,
    path: d,
  };
});

const LOCATIONS = [
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, creatorCount: 50, countDisplay: "50+", category: "Entertainment & Fashion" },
  { name: "Pune", lat: 18.5204, lon: 73.8567, creatorCount: 45, countDisplay: "45+", category: "Tech & Urban Lifestyle" },
  { name: "Nashik", lat: 19.9975, lon: 73.7898, creatorCount: 25, countDisplay: "25+", category: "Agriculture & Food" },
  { name: "Ahilyanagar", lat: 19.0948, lon: 74.7480, creatorCount: 20, countDisplay: "20+", category: "Rural Agriculture & Machinery" },
  { name: "Chhatrapati Sambhajinagar", lat: 19.8762, lon: 75.3433, creatorCount: 20, countDisplay: "20+", category: "Regional Commerce" },
  { name: "Kolhapur", lat: 16.7050, lon: 74.2433, creatorCount: 20, countDisplay: "20+", category: "Cultural & Vernacular Reach" },
  { name: "Nagpur", lat: 21.1458, lon: 79.0882, creatorCount: 25, countDisplay: "25+", category: "Vidarbha Regional Hub" },
  { name: "Satara", lat: 17.6805, lon: 74.0183, creatorCount: 15, countDisplay: "15+", category: "Agri-Business & Dairy" },
  { name: "Sangli", lat: 16.8524, lon: 74.5815, creatorCount: 15, countDisplay: "15+", category: "Agri-Business & Dairy" },
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

console.log("Total districts projected:", districts.length);
console.log("Sample district names:", districts.map((d: any) => d.name).slice(0, 8));
console.log("Projected locations:", JSON.stringify(projectedLocations, null, 2));
