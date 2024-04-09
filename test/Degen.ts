import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Degen", function () {
  async function deployDegens() {
    const NAME = "Degen";
    const SYMBOL = "DGN";
    const AMOUNT = 1_000_000_000;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Degen = await hre.ethers.getContractFactory("Degen");
    const degen = await Degen.deploy(NAME, SYMBOL, AMOUNT);

    return { degen, NAME, SYMBOL, owner, otherAccount, AMOUNT };
  }
  describe("Deployment", function () {
    it("Should be have the same name, symbol, and totalSupply", async function () {
      const { degen, NAME, SYMBOL, AMOUNT } = await loadFixture(deployDegens);
      expect(await degen.name()).to.be.eql(NAME);
      expect(await degen.symbol()).to.be.eql(SYMBOL);
      expect(ethers.toNumber(await degen.totalSupply())).to.be.eql(AMOUNT);
    });
  });

  describe("minting", function () {
    it("Should be reverted if minter is not owner", async () => {
      const { degen, otherAccount, owner, AMOUNT } = await loadFixture(
        deployDegens
      );
      await expect(degen.connect(otherAccount).mint(owner.address, AMOUNT))
        .to.be.revertedWithCustomError(degen, "OwnableUnauthorizedAccount")
        .withArgs(otherAccount.address);
    });
    it("Should mint if owner", async () => {
      const { degen, AMOUNT, otherAccount } = await loadFixture(deployDegens);
      await expect(
        degen.mint(otherAccount.address, AMOUNT)
      ).to.changeTokenBalance(degen, otherAccount, +AMOUNT);
    });
  });

  describe("burn", function () {
    it("Should burn a user token", async () => {
      const { degen, owner } = await loadFixture(deployDegens);
      await expect(degen.burn(10000)).to.changeTokenBalance(
        degen,
        owner,
        -10000
      );
    });
  });

  describe("Transfer", function () {
    it("Should transfer tokens from a user to another", async () => {
      const { degen, owner, otherAccount } = await loadFixture(deployDegens);
      await expect(
        degen.transfer(otherAccount.address, 10000)
      ).to.changeTokenBalance(degen, otherAccount, +10000);
    });
  });

  describe("getStoreItems", () => {
    it("Should getStoreItems", async () => {
      const { degen } = await loadFixture(deployDegens);
      await expect(await degen.getStoreItems()).to.be.eqls(
        "The following items are available for purchase:\nSelection 1. Official Degen NFT\nSelection 2. Official Degen NFT\nSelection 3. Official Degen NFT"
      );
    });
  });

  describe("redeemItems", () => {
    it("Should return false if no choice is given", async () => {
      const { degen } = await loadFixture(deployDegens);
      const tx = await degen.redeemItems(4);
      tx.wait();
      await expect(Boolean(tx.value)).to.be.eql(false);
    });
    describe("Choice = 1", () => {
      it("Should revert if the balance of sender is less than 100", async () => {
        const { degen, otherAccount } = await loadFixture(deployDegens);
        await expect(
          degen.connect(otherAccount).redeemItems(1)
        ).to.be.revertedWith("You do not have enough Degen Tokens");
      });
      it("Should redeem the item ", async () => {
        const { degen, otherAccount, owner, AMOUNT } = await loadFixture(
          deployDegens
        );
        await degen.mint(otherAccount.address, AMOUNT);
        await expect(
          degen.connect(otherAccount).redeemItems(1)
        ).to.changeTokenBalance(degen, owner, +100);
      });
    });
    describe("Choice = 2", () => {
      it("Should revert if the balance of sender is less than 75", async () => {
        const { degen, otherAccount } = await loadFixture(deployDegens);
        await expect(
          degen.connect(otherAccount).redeemItems(2)
        ).to.be.revertedWith("You do not have enough Degen Tokens");
      });
      it("Should redeem the item ", async () => {
        const { degen, otherAccount, owner, AMOUNT } = await loadFixture(
          deployDegens
        );
        await degen.mint(otherAccount.address, AMOUNT);
        await expect(
          degen.connect(otherAccount).redeemItems(2)
        ).to.changeTokenBalance(degen, owner, +75);
      });
    });
    describe("Choice = 3", () => {
      it("Should revert if the balance of sender is less than 50", async () => {
        const { degen, otherAccount } = await loadFixture(deployDegens);
        await expect(
          degen.connect(otherAccount).redeemItems(3)
        ).to.be.revertedWith("You do not have enough Degen Tokens");
      });
      it("Should redeem the item ", async () => {
        const { degen, otherAccount, owner, AMOUNT } = await loadFixture(
          deployDegens
        );
        await degen.mint(otherAccount.address, AMOUNT);
        await expect(
          degen.connect(otherAccount).redeemItems(3)
        ).to.changeTokenBalance(degen, owner, +50);
      });
    });
  });
});
