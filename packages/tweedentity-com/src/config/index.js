
const config = {
  supported: {
    'Görli Testnet': 5,
    'Binance Smart Chain Testnet': 97,
    'Local Dev Network': 1337
  },
  address: {
    5: {},
    97: {},
    1337: {
      Tweedentities: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      IdentityClaimer: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      IndentityManager: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
      Twiptos: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
      ZeroXNilRegistry: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'
    }

  }
}

config.supportedId = {}
for (let i in config.supported) {
  config.supportedId[config.supported[i]] = i
}

module.exports = config