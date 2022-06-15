
const hre = require("hardhat");

async function main() {
 
 
 const [admin,reporter] = await hre.ethers.getSigners();
 const Oracle = await hre.ethers.getContractFactory("Oracle");
 const oracle = await Oracle.deploy(admin.address);

 await oracle.deployed()

 console.log("deployed to :",oracle.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
