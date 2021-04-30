const {expect, assert} = require("chai");
const {assertThrowsMessage, getSignature, getSignature3} = require('../src/helpers')
const {utils} = require('../src')

describe("Twiptos", async function () {

  let Tweedentities
  let store
  let Claimer
  let claimer
  let IdentityManager
  let identity
  let Twiptos;
  let tweedentity;

  const apps = {
    twitter: [1, true],
    reddit: [2, false],
    facebook: [3, true]
  }

  let owner, oracle, org, bob, alice, mark, joe, bill, wikileaks, assange
  let signature
  let tid = '273645362718263746'
  let addr0 = '0x0000000000000000000000000000000000000000'

  const rid = 'fxP8r3'
  let timestamp;
  let chainId;

  before(async function () {
    const signers = await ethers.getSigners()
    owner = signers[0];
    oracle = signers[1];
    org = signers[2];
    bob = signers[3];
    alice = signers[4];
    wikileaks = signers[5];
    assange = signers[6];
    mark = signers[7];
    joe = signers[8];
    bill = signers[9];
    await initNetworkAndDeploy()
    chainId = await tweedentity.getChainId()
  })

  async function initNetworkAndDeploy() {
    // store
    Tweedentities = await ethers.getContractFactory("Tweedentities");
    store = await Tweedentities.deploy(addr0, 0);
    await store.deployed();
    // //claimer
    Claimer = await ethers.getContractFactory("IdentityClaimer");
    claimer = await Claimer.deploy(addr0, store.address);
    await claimer.deployed();
    await store.addManager(claimer.address)
    // identity manager
    IdentityManager = await ethers.getContractFactory("IdentityManager");
    identity = await IdentityManager.deploy(oracle.address, store.address, claimer.address);
    await identity.deployed();
    await store.addManager(identity.address);
    await claimer.addManager(identity.address);
    // token token
    Twiptos = await ethers.getContractFactory("Twiptos");
    tweedentity = await Twiptos.deploy(
        oracle.address,
        org.address,
        "https://store.token.com/metadata/{id}.json",
        store.address
    );
    await tweedentity.deployed();

  }

  async function getTimestamp() {
    return (await ethers.provider.getBlock()).timestamp
  }

  describe('#create', async function () {

    beforeEach(async function () {
      await initNetworkAndDeploy();
    });

    it("should mint a personal tokens without donations", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity, bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await expect(tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [], [], 0))
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, addr0, bob.address, tokenId, 100);

    });

    it("should throw trying to mint again too early", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [], [], 0)

      tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await assertThrowsMessage(
          tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [], [], 0),
          'Too early for new minting');

    });

    it("should mint a second token after the required time", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      await tweedentity.updateMinTimeBetweenMintingEvents(1)

      let tokenId = await tweedentity.nextTokenId(1, tid)

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [], [], 0)

      await utils.sleep(1000)

      // this is to block a new block in hardhat blockchain simulation
      await tweedentity.updateMinTimeBetweenMintingEvents(1)

      await utils.sleep(1000)

      // this is to block a new block in hardhat blockchain simulation
      await tweedentity.updateMinTimeBetweenMintingEvents(1)


      assert.equal((await tweedentity.secondsToWaitBeforeNextMinting(1, tid)).toNumber(), 0)
      assert.isTrue((await tweedentity.isNotTooEarly(1, tid)))

      tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await expect(tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [], [], 0))
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, addr0, bob.address, tokenId, 100);

    });

    it("should mint a personal tokens with a donation to the org", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await expect(tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [3], [addr0], 0))
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, addr0, bob.address, tokenId, 100)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, org.address, tokenId, 3);

    });

    it("should mint a personal tokens with multiple donations", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await expect(tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [5, 4, 4], [wikileaks.address, assange.address, addr0], 0))
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, addr0, bob.address, tokenId, 100)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, wikileaks.address, tokenId, 5)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, assange.address, tokenId, 4)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, org.address, tokenId, 4);
    });

    it("should mint a personal tokens with other donations", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tokenId, timestamp)

      await expect(tweedentity.connect(bob).create(1, tokenId, 100, timestamp, signature, [4, 3], [wikileaks.address, assange.address], 0))
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, addr0, bob.address, tokenId, 100)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, wikileaks.address, tokenId, 4)
          .to.emit(tweedentity, 'TransferSingle')
          .withArgs(bob.address, bob.address, assange.address, tokenId, 3);

    });

  })


  describe('#createBatch', async function () {

    beforeEach(async function () {
      await initNetworkAndDeploy();
    });

    it("should mint three personal tokens without donations", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      let tokenIds = [
        tokenId,
        tokenId.add(1),
        tokenId.add(2)
      ]
      timestamp = await getTimestamp()
      signature = getSignature3(ethers, tweedentity, bob.address, 1, tokenIds, timestamp)
      let supplies = [100, 50, 30]
      let donations = [0, 0, 0]
      let donees = []

      await expect(tweedentity.connect(bob).createBatch(
          1,
          tokenIds,
          supplies,
          timestamp,
          signature,
          donations,
          donees,
          0
      ))
          .to.emit(tweedentity, 'TransferBatch')
          .withArgs(bob.address, addr0, bob.address, tokenIds, supplies);

      let minTimeBetweenMintingEvents = (await tweedentity.minTimeBetweenMintingEvents()).toNumber()
      let waitingTime = (await tweedentity.secondsToWaitBeforeNextMinting(1, tid)).toNumber()

      assert.isTrue(waitingTime <= 3 * minTimeBetweenMintingEvents && waitingTime > (3 * minTimeBetweenMintingEvents) - 10)

    });

    it("should mint three personal tokens with donations to three orgs", async function () {

      timestamp = await getTimestamp()
      signature = getSignature(ethers, identity,bob.address, 1, tid, timestamp)

      await identity.connect(bob).setIdentity(1, tid, timestamp, signature)

      let tokenId = await tweedentity.nextTokenId(1, tid)
      let tokenIds = [
        tokenId,
        tokenId.add(1),
        tokenId.add(2)
      ]
      timestamp = await getTimestamp()
      signature = getSignature3(ethers, tweedentity, bob.address, 1, tokenIds, timestamp)
      let supplies = [5, 50, 500]
      let donations = [1, 5, 13]
      let donees = [
        wikileaks.address,
        assange.address,
        org.address
      ]

      await expect(tweedentity.connect(bob).createBatch(
          1,
          tokenIds,
          supplies,
          timestamp,
          signature,
          donations,
          donees,
          0
      ))
          .to.emit(tweedentity, 'TransferBatch')
          .withArgs(bob.address, addr0, bob.address, tokenIds, supplies)
          .to.emit(tweedentity, 'TransferBatch')
          .withArgs(bob.address, bob.address, wikileaks.address, tokenIds, [1, 2, 5])
          .to.emit(tweedentity, 'TransferBatch')
          .withArgs(bob.address, bob.address, assange.address, tokenIds, [0, 2, 4])
          .to.emit(tweedentity, 'TransferBatch')
          .withArgs(bob.address, bob.address, org.address, tokenIds, [0, 1, 4])

    });

  })

});
