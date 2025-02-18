function sortIncrements(routes) {
  return routes.sort((a, b) => {
    if (a["order"] > b["order"]) return 1;
    if (a["order"] < b["order"]) return -1;
    return 0;
  });
}

function sortDecrements(routes) {
  return routes.sort((a, b) => {
    if (a["order"] < b["order"]) return 1;
    if (a["order"] > b["order"]) return -1;
    return 0;
  });
}

export { sortIncrements, sortDecrements };
