
const hre = require("hardhat");
const CoinGecko = require("coingecko-api");

async function main() {
  
  // We get the contract to deploy
  const [admin, reporter] = await hre.ethers.getSigners();
  const Oracle = await hre.ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy(admin.address);

  await oracle.deployed();

 
  const POLL_INTERVAL = 5000;
  const CoinGeckoClient = new CoinGecko();

  while (true) {
    const response = await CoinGeckoClient.coins.fetch("bitcoin", {});
    let currentPrice = parseFloat(response.data.market_data.current_price.usd);

    await oracle.connect(admin).updateReporter(reporter.address, true);

    await oracle
      .connect(reporter)
      .updateData(
        hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("BTC/USD")),
        currentPrice
      );
    console.log("new price", currentPrice);

    const data = await oracle.getData(
      hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("BTC/USD"))
    );

    console.log(data);
    await new Promise((resolve, _) => setTimeout(resolve, POLL_INTERVAL));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });