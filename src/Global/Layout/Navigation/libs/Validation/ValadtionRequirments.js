import { errorMessage } from "../error/errorMessage";
import { isValidElement } from "react";
import { parseNumber, isInt } from "../numberLib/number";

export const ValadtionRequirments = new Map([
  [
    "id",
    {
      datatype: (value) => {
        return typeof value === "string";
      },
      required: true,
      errorMessage: errorMessage("id", "string"),
    },
  ],
  [
    "navigationname",
    {
      datatype: (value) => {
        return typeof value === "string";
      },
      required: true,
      errorMessage: errorMessage("navigationName", "string"),
    },
  ],
  [
    "element",
    {
      datatype: (value) => {
        return isValidElement(value);
      },
      required: true,
      errorMessage: "",
    },
  ],
  [
    "path",
    {
      datatype: (value) => {
        return typeof value === "string";
      },
      required: true,
      errorMessage: "The data type for path value must be type string",
    },
  ],
  [
    "order",
    {
      datatype: (value) => {
        if (typeof value !== "number") return false;
        return parseNumber(value, isInt);
      },
      required: true,
      errorMessage: errorMessage("order", "integer"),
    },
  ],
  [
    "private",
    {
      datatype: (value) => {
        if (typeof value !== "number") return false;
        if (!parseNumber(value, isInt)) return false;
        if (typeof value !== "number") return false;

        // const less = value >= -1;
        // const more = value <= 1;
        // l(value, "less", less, "more", more, less && more);
        // l("--------\n");
        return value >= -1 && value <= 1;

        // return 2 < value || value > -2;
      },
      errorMessage: errorMessage(
        "private",
        "number and the number must be no greater than 1 and no less than -1"
      ),
    },
  ],
  [
    "navigation",
    {
      datatype: (value) => {
        return typeof value === "boolean";
      },
      required: true,
      errorMessage: errorMessage("navigation", "boolean"),
    },
  ],
  [
    "footer",
    {
      datatype: (value) => {
        return typeof value === "boolean";
      },
      required: true,
      errorMessage: errorMessage("footer", "boolean"),
    },
  ],
  [
    "errorcomponent",
    {
      datatype: (value) => {
        return typeof value === "boolean";
      },
      required: true,
      errorMessage: errorMessage("footer", "boolean"),
    },
  ],
  [],
]);
