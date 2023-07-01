const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
// describe("SimpleStorage",()=>{})
describe("SimpleStorage", function () {
    let SimpleStorageFactory, SimpleStorage
    beforeEach(async function () {
        console.log("Starting -test Deploy ")
        // console.log(process.env.PRIVATE_KEY)
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        console.log("Deploying SimpleStorage.....")
        SimpleStorage = await SimpleStorageFactory.deploy()
        SimpleStorage = await SimpleStorage.waitForDeployment()
    })
    it("should start with a favorite Number of 0", async () => {
        const currectValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currectValue.toString(), expectedValue)
    })
    it("Should update when we call store ", async () => {
        const expectedValue = "23232"
        const transcationResponse = await SimpleStorage.store(expectedValue)
        await transcationResponse.wait(1)
        const currectValue = await SimpleStorage.retrieve()
        assert.equal(currectValue.toString(), expectedValue)
    })

    it("should work correctly with the prople struct and array", async () => {
        const expectedPersonName = "karthik"
        const expectedFavoriteNumber = "11334"
        const transcationResponse = await SimpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transcationResponse.wait(1)
        const { favoriteNumber, name } = await SimpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
