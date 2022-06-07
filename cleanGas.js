const fs = require("fs");
let json = JSON.parse(fs.readFileSync("./gasReporterOutput.json"));
json = json.info;
const deployments = json.deployments;
const deploymentsKeys = Object.keys(deployments);
let hasDataName = [];
for (let i = 0; i < deploymentsKeys.length; i++) {
  const deployment = deployments[deploymentsKeys[i]];
  const deploymentKey = Object.keys(deployment);
  deployment["bytecode"] = "";
  deployment["deployedBytecode"] = "";
  const gasData = deployment.gasData;
  deployment.avgGas = 0;
  if (gasData.length > 0) {
    deployment.avgGas = Math.round(gasData.reduce((a, b) => a + b, 0) / gasData.length);
    hasDataName.push(deployment.name);
  }
}
console.log(JSON.stringify(hasDataName, null, 2));

fs.writeFileSync(
  "./gasReporterOutput.json",
  JSON.stringify(
    deployments.filter((d) => hasDataName.includes(d.name)),
    null,
    2
  )
);
