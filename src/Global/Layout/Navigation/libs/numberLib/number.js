export function isInt(n) {
  if (isNaN(n)) return false;
  return Number(n) === n && n % 1 === 0;
}

export function parseNumber(val, callback) {
  try {
    if (!Number(val)) return false;
    const includeDecimal = val;
    if (String(includeDecimal).includes(".")) return callback(parseFloat(val));
    else return callback(parseInt(val));
  } catch (error) {
    return error;
  }
}
