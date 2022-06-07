const fs = require("fs");
const args = process.argv.slice(2);

let weight = fetchArg("-w", 1);
let baseFile = fetchArg("-b", "./gasReporterOutput_base.json");

let newFile = fetchArg("-n", "./gasReporterOutput.json");

const baseJson = JSON.parse(fs.readFileSync(baseFile));
const newJson = JSON.parse(fs.readFileSync(newFile));

const baseMethods = baseJson.map((b) => b.name);

const comparisonMethods = newJson.map((n) => n.name);
let gasSavings = []
for (let i = 0; i < comparisonMethods.length; i++) {
  let newMethod = newJson.filter((n) => n.name === comparisonMethods[i])[0];
  let filteredBaseMethods = baseJson.filter((n) => n.name === comparisonMethods[i]);
  let baseMethod = filteredBaseMethods.length > 0 ? filteredBaseMethods[0] : null;
  if (baseMethod) {
    console.log("\n*************" + comparisonMethods[i].toUpperCase() + "**************");
    let baseGas = baseMethod.avgGas;
    let newGas = newMethod.avgGas;
    let gasDiff = baseGas - newGas;
    let gasDiffPercent = (gasDiff / baseGas) * 100;
    gasSavings.push({newGas,baseGas})
    console.log(`gas ${gasDiff * weight}\nrelative: ${gasDiffPercent}%`);
  }
}
let aggregateNewGas = gasSavings.map((g) => g.newGas).reduce((a, b) => a + b, 0);
let aggregateBaseGas = gasSavings.map((g) => g.baseGas).reduce((a, b) => a + b, 0);
let aggregateGasSavings = (aggregateBaseGas - aggregateNewGas);
let aggregateGasSavingsPercent = (aggregateGasSavings / aggregateBaseGas) * 100;
console.log(`\n\nAggregate gas savings: ${aggregateGasSavings*weight}`);
console.log(`Aggregate gas savings percent: ${aggregateGasSavingsPercent}%`);

function fetchArg(arg, defaultVal) {
  let index = args.indexOf(arg);
  if (index === -1) val = defaultVal;
  else {
    if (index === args.length - 1) throw "Missing value for " + arg;

    val = args[index + 1];
    if (typeof defaultVal === "number" && isNaN(parseFloat(val))) throw "Invalid value for " + arg;
  }
  return val;
}
