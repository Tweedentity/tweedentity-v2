const {expect, assert} = require("chai");
const {assertThrowsMessage} = require('./helpers')
const {utils} = require('@tweedentity/common')

describe("Application", async function () {

  let Application;
  let application;
  let IsApplication
  let store

  const apps = {
    twitter: [1, true],
    reddit: [2, false],
    facebook: [3, true]
  }

  let owner, manager, manager2, user
  let addr0 = '0x0000000000000000000000000000000000000000'

  let tweedentityApp = ethers.utils.formatBytes32String('tweedentity')
  let twitter = ethers.utils.formatBytes32String('twitter')
  let reddit = ethers.utils.formatBytes32String('reddit')

  let timestamp;
  let chainId;

  before(async function () {
    const signers = await ethers.getSigners()
    owner = signers[0];
    manager = signers[1];
    user = signers[2]
  })

  async function initNetworkAndDeploy() {
    Application = await ethers.getContractFactory("Application");
    application = await Application.deploy();
    await application.deployed();
    store = await ethers.getContractFactory("IsApplicationMock");
    store = await store.deploy();
    await store.deployed();
  }

  async function getTimestamp() {
    return (await ethers.provider.getBlock()).timestamp
  }

  //

  describe('#constructor', async function () {

    beforeEach(async function () {
      await initNetworkAndDeploy();
    });

    it("should verify that twitter and reddit are set up", async function () {

      assert.equal((await store.apps(0)), tweedentityApp)

      assert.equal((await application.lastAppId()).toNumber(), 0)

      assert.equal((await store.apps(1)), twitter)
      assert.equal((await store.apps(2)), reddit)
      assert.equal((await store.lastAppId()).toNumber(), 2)
    });

  })

  describe('#addApp', async function () {

    beforeEach(async function () {
      await initNetworkAndDeploy();
    });


    it("should add an app", async function () {
      const appNickname = ethers.utils.formatBytes32String('facebook')
      await expect(application.addApp(appNickname))
          .to.emit(application, 'AppAdded')
          .withArgs(1, appNickname);
    });

    it('should throw adding another app with a string as nickname', async function () {
      const appNickname = ethers.utils.formatBytes32String('linkedin')
      try {
        await application.addApp('linkedin')
        assert.isTrue(false)
      } catch (e) {
        assert.isTrue(e.message.indexOf('invalid arrayify value') > -1)
      }
    })

  })


});