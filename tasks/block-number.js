const { task } = require("hardhat/config")

task("block-number", "Print current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = hre.ethers.provider.getBlockNumber()
        console.log(`current block number is ${blockNumber}`)
    }
)
module.exports = {}
