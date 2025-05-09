import parse, { domToReact } from "html-react-parser";
export function parseQuestionText(value) {
  const splitVal = value.split("\n");
  let newValue = "";
  let next = false;
  for (let x = 0; x < splitVal.length; x++) {
    const val = splitVal[x];
    if (val.replaceAll(" ", "") === "") continue;
    if (next) {
      next = false;
      continue;
    }
    if (val.length === 2 && val[1] === ".") {
      newValue = newValue + val + splitVal[x + 1] + "\n";
      next = true;
    } else {
      newValue = newValue + val + "\n";
    }
  }
  return newValue;
}

export const options = {
  replace({ attribs, children }) {
    if (!attribs) {
      return;
    }

    // if (attribs.id === "main") {
    //   return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
    // }

    if (attribs.class === "prettify") {
      return domToReact(children, options);
      //   return (
      //     <span style={{ color: "hotpink" }}>
      //       {domToReact(children, options)}
      //     </span>
      //   );
    }
  },
};
