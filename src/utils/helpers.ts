/*
  Get a distance between two geographic coordinates in metres
*/
export function getDistanceFromLatLonInMetres(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dKm = R * c; // Distance in km
  const dM = dKm * 1000; // distance in M
  const dRound = Math.round(dM); // distance rounded to nearest metre
  return dRound;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

/*
  Format a value of metres to be either represented in metres or kilometres.
  eg. 999 => 999m
      1550 => 1.55km
*/
export const formatDistanceText = (metres: number) => {
  const km = Math.round(metres / 1000);

  if (km <= 0.9) {
    return `${Math.round(metres)} m`;
  } else {
    return `${km} km`;
  }
};

/*
  Add commas to numbers > 3 digits.
  eg. 1000000 => 1,000,000
*/
export const commaFormatNumber = (num: number) => {
  return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
};

/*
  Abbreviate numbers above 999.
  eg. 1000 => 1k
*/
export const kFormatter = (num: number, uppercase = false) => {
  return Math.abs(num) > 999
    ? `${Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))}${uppercase ? 'K' : 'k'} }`
    : Math.sign(num) * Math.abs(num);
};

/*
  Modify a hex color value to add alpha level information
*/
export const addAlpha = (color: string, opacity: number) => {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

/*
  Compare two Sets of number | string | boolean to determine if they are equal
*/
export const arePrimitiveSetsEqual = (a: Set<number | string | boolean>, b: Set<number | string | boolean>) => {
  return a.size === b.size && [...a].every((value) => b.has(value));
};
