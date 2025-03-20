import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const code = `\
function sum(a, b) {
  const result = a + b;
  return result;
}`;
const ast = parse(code, { sourceType: "module" });

const result: Set<string> = new Set();

traverse(ast, {
  Identifier(path) {
    result.add(path.node.name);
  },
});

console.warn(Array.from(result.values()));
