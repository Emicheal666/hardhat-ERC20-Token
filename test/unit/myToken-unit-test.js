const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { initialSupply } = require("../../helper-hardhat-config");

describe("My token", function () {
  const multiplier = 10 ** 18;
  let deployer, myToken, user1;

  beforeEach(async function () {
    const accounts = await getNamedAccounts();
    deployer = accounts.deployer;
    user1 = accounts.user1;
    await deployments.fixture(["all"]);
    myToken = await ethers.getContract("MyToken", deployer);
  });

  it("MyToken was deployed", async function () {
    assert(myToken.address);
  });

  describe("constructor", function () {
    it("initializes that our total supply", async function () {
      const totalSupply = await myToken.totalSupply();
      assert.equal(totalSupply.toString(), initialSupply);
    });

    it("initializes the token name and symbol", async function () {
      const name = await myToken.name();
      assert.equal(name, "EMic");

      const symbol = await myToken.symbol();
      assert.equal(symbol, "EM");
    });
  });

  describe("minting", () => {
    it("user can not mint", async () => {
      try {
        await ourToken._mint(deployer, 100);
        assert(false);
      } catch (e) {
        assert(e);
      }
    });
  });

  describe("transfers", function () {
    it("it should transfer token successfully", async function () {
      const tokensToSend = ethers.utils.parseEther("10");
      await myToken.transfer(user1, tokensToSend);
      expect(await myToken.balanceOf(user1)).to.equal(tokensToSend);
    });
    it("emits an transfer event, when an transfer occurs", async () => {
      await expect(
        myToken.transfer(user1, (10 * multiplier).toString())
      ).to.emit(myToken, "Transfer");
    });
  });

  describe("allowances", () => {
    const amount = (20 * multiplier).toString();
    beforeEach(async () => {
      playerToken = await ethers.getContract("MyToken", user1);
    });
    it("Should approve other address to spend token", async () => {
      const tokensToSpend = ethers.utils.parseEther("5");
      await myToken.approve(user1, tokensToSpend);
      const myToken1 = await ethers.getContract("MyToken", user1);
      await myToken1.transferFrom(deployer, user1, tokensToSpend);
      expect(await myToken1.balanceOf(user1)).to.equal(tokensToSpend);
    });
    it("doesn't allow an unnaproved member to do transfers", async () => {
      //Deployer is approving that user1 can spend 20 of their precious EM's

      await expect(
        playerToken.transferFrom(deployer, user1, amount)
      ).to.be.revertedWith("ERC20: insufficient allowance");
    });
    it("emits an approval event, when an approval occurs", async () => {
      await expect(myToken.approve(user1, amount)).to.emit(myToken, "Approval");
    });
    it("the allowance being set is accurate", async () => {
      await myToken.approve(user1, amount);
      const allowance = await myToken.allowance(deployer, user1);
      assert.equal(allowance.toString(), amount);
    });
    it("won't allow a user to go over the allowance", async () => {
      await myToken.approve(user1, amount);
      await expect(
        playerToken.transferFrom(deployer, user1, (40 * multiplier).toString())
      ).to.be.revertedWith("ERC20: insufficient allowance");
    });
  });
});
