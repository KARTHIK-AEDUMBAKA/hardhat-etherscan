const { ethers, run, network } = require("hardhat")

async function main() {
    console.log("Starting")
    // console.log(process.env.PRIVATE_KEY)
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying SimpleStorage.....")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.waitForDeployment()
    address = await SimpleStorage.getAddress()
    console.log(`deployed contract to ${address}`)
    console.log("1")
    console.log(`chainId: ${network.config.chainId}`)
    console.log(`Etherscan API key: ${process.env.ETHERSCAN_API_KEY}`)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        const deploytransaction =
            await SimpleStorage.deploymentTransaction().wait(6)
        console.log("ok..")
        address = await SimpleStorage.getAddress()
        await verify(address, [])
    }
    console.log("2")
    const currentValue = await SimpleStorage.retrieve()
    console.log(`current value: ${currentValue}`)

    // update the currect value
    const transcationResponse = await SimpleStorage.store(23232)
    await transcationResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`updated value: ${updatedValue}`)
    console.log("🧑‍💻🧑‍💻   successfully completed   🧑‍💻🧑‍💻")
    console.log("end of contract")
}
async function verify(contractAddress, args) {
    console.log(",.........verifying...........,")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
