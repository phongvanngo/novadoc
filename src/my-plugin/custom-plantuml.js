const visit = require("unist-util-visit");
const plantumlEncoder = require("plantuml-encoder");

const fs = require("fs");

const DEFAULT_OPTIONS = {
  baseUrl: "https://www.plantuml.com/plantuml/png",
};

const plugin = () => {
  const transformer = async (ast) => {
    visit(ast, "link", (node) => {
      if (node.children[0].value == "nova-puml") {
        console.log("node ne", node);
        const url = "." + node.url;
        const content = fs.readFileSync(url, { encoding: "utf8" });
        console.log(content);
        const options = { ...DEFAULT_OPTIONS };
        node.type = "image";
        node.url = `${options.baseUrl.replace(
          /\/$/,
          ""
        )}/${plantumlEncoder.encode(content)}`;
      }
    });
  };
  return transformer;
};

module.exports = plugin;
