import { ValadtionRequirments } from "./ValadtionRequirments";
// const checkforKeys_ = [
//   "id",
//   "navigationname",
//   "element",
//   "path",
//   "order",
//   "private",
//   "navigation",
//   "footer",
//   "errorcomponent",
// ];

function isEmpty(val) {
  if (typeof val === "boolean") return false;
  if (!val || val === null || val === undefined || val === "") return true;
  if (Number(val)) return false;
  if (val.replaceAll(" ", "") === "") return true;
  return false;
}

function NavigationValidation(routes) {
  try {
    if (!Array.isArray(routes)) throw new Error("routes is not an array");
    if (routes.length <= 0) throw new Error("routes is empty");

    const errorCollecter = [];
    let index = 0;
    for (let route of routes) {
      const checkedKeys = new Set();
      for (let [key, value] of Object.entries(route)) {
        const keyLoweCase = key.toLocaleLowerCase();
        if (!ValadtionRequirments.has(keyLoweCase)) continue;
        if (keyLoweCase !== "element") {
          if (isEmpty(value)) {
            errorCollecter.push({
              index: index,
              [key]: `The value for ${value} is empty`,
              value: value,
            });
          }
        }
        const valdater = ValadtionRequirments.get(keyLoweCase);
        const isValidDatatype = valdater.datatype(value);

        if (!isValidDatatype) {
          errorCollecter.push({
            index: index,
            [key]: valdater.errorMessage,
            value: value,
          });
        }
        checkedKeys.add(key);
      }

      if (checkedKeys.size !== 9) {
        errorCollecter.push({
          index: index,
          errorMessage: "Missing Keys in routes Object",
        });
      }

      index += 1;
    }
    //
    // end of Loop
    //
    // l(errorCollecter);

    if (errorCollecter.length > 0) {
      throw errorCollecter;
    }
    return { isError: false };
  } catch (error) {
    return { isError: true, error: error };
  }
}

export default NavigationValidation;
