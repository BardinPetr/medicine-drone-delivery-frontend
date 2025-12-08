export const makeCircle = (feature: any) => {
  const points = 32
  const coords = {
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0]
  };
  // TODO: make adequate formulae
  const km = feature.properties.radius / 1000;
  const ret = [];
  const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [ret]
    }
  }
};
