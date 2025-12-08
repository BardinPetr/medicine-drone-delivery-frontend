const KM_PER_DEGREE_LATITUDE = 110.574;
const KM_PER_DEGREE_LONGITUDE = 111.320;

export const createCirclePolygon = (
  latitude: number,
  longitude: number,
  radiusMeters: number,
  points: number = 32
) => {
  const radiusKm = radiusMeters / 1000;
  const kmPerDegLon = KM_PER_DEGREE_LONGITUDE * Math.cos(latitude * (Math.PI / 180));
  const result: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dLon = radiusKm * Math.cos(angle) / kmPerDegLon;
    const dLat = radiusKm * Math.sin(angle) / KM_PER_DEGREE_LATITUDE;
    result.push([longitude + dLon, latitude + dLat]);
  }
  result.push(result[0]);
  return result
};

export const makeCircle = (feature: any) => {
  const pts = createCirclePolygon(
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.radius
  )
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [pts]
    },
    properties: {}
  };
};
