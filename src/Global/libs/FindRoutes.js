const FindRoutes = (pageRoutes, key, equivalentValue) => {
  return pageRoutes.filter((route) => {
    if (route[key] === equivalentValue) return route;
  });
};

export default FindRoutes;
