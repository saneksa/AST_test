import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generator from "@babel/generator";
import * as t from "babel-types";

const code = `\
const q = 2, w = 5;

function calc() {
  const a = 10;
  let b = 20;
  const result = a * 2 + w;
  return result;
}`;

const ast = parse(code, { sourceType: "module" });

traverse(ast, {
  VariableDeclarator(path) {
    const parentNode = path.parent;

    if (!t.isVariableDeclaration(parentNode)) return;

    if (parentNode.kind !== "const" && parentNode.kind !== "let") return;

    const variableName = path.node.id?.name;

    const binding = path.scope.getBinding(variableName);

    if (binding && !binding.referenced) {
      path.remove();
    }
  },
});

console.warn(generator(ast).code);
