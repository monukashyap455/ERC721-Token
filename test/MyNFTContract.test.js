// We import Chai to use its asserting functions here.
const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat")
require('dotenv').config();

describe("MyNFTContract", function () {

    async function deployMYNFTTokenFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyNFTContract");
        const token = await MyToken.deploy('MyNFTContract', 'MYNFTC');
        return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should has the correct name and symbol", async function () {
            const { token, owner } = await loadFixture(deployMYNFTTokenFixture);
            const total = await token.balanceOf(owner.address);
            expect(total).to.equal(0);
            expect(await token.name()).to.equal('MyNFTContract');
            expect(await token.symbol()).to.equal('MYNFTC');
        });
    });

    describe("Mint NFT", function () {
        it("Should mint a token with token ID 1 & 2 to account1", async function () {
            const { token, otherAccount } = await loadFixture(deployMYNFTTokenFixture);
            const address1 = otherAccount.address;
            await token.mintTo(address1);
            expect(await token.ownerOf(1)).to.equal(address1);

            await token.mintTo(address1);
            expect(await token.ownerOf(2)).to.equal(address1);

            expect(await token.balanceOf(address1)).to.equal(2);
        });
    });
});