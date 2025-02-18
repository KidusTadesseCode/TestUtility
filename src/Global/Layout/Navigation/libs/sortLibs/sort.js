export function sortIncrements(routes) {
  return routes.sort((a, b) => {
    if (a["order"] > b["order"]) return 1;
    if (a["order"] < b["order"]) return -1;
    return 0;
  });
}

export function sortDecrements(routes) {
  return routes.sort((a, b) => {
    if (a["order"] < b["order"]) return 1;
    if (a["order"] > b["order"]) return -1;
    return 0;
  });
}
export function isURL(s) {
  const regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}
