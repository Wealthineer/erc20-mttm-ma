// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );
    // Hardhat always runs the compile task when running scripts with its command

    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

    const MttmMA = await hre.ethers.getContractFactory("MttmMaToken");
    const mttmMA = await MttmMA.deploy();

    await mttmMA.deployed();


    console.log("MTTM-MA deployed to:", mttmMA.address);

    const MultiMinter = await hre.ethers.getContractFactory("MultiMinter");
    const multiMinter = await MultiMinter.deploy();

    await multiMinter.deployed();


    console.log("MultiMinter deployed to:", multiMinter.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
