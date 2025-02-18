const l = console.log;
const ok = Object.keys;
const ov = Object.values;
const oe = Object.entries;
const clear = () => process.stdout.write("\x1Bc");

export { l, ok, ov, oe, clear };
