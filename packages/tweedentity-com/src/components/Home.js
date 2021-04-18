const React = require('react')
const {Container, Row, Col, //Button,
  Badge} = require('react-bootstrap')


// eslint-disable-next-line no-undef
const Base = require('./Base')

module.exports = class Home extends Base {


  goToApp() {
    location.href = `${location.protocol}//app.${location.host}/#/connecting`
  }

  render() {
    return (
      <Container style={{marginTop: 32}}>

          <Row>
            <Col md={12}>
              <div className="centered"><img src="/images/tweedentity-complete-logo.png" className="fulllogo" /></div>
              <div className="centered large">In the era of decentralized apps (ÐApps), people deserve a simpler way to identify
                themselves and log in.
              </div>
            </Col>
          </Row>

        <Row><Col><div className="thinline"><div></div></div></Col></Row>


          <Row>
            <Col md={3}>
              <h3>What it is</h3>
              <p>Tweedentity is a secure identity solution that connects the centralized and
                the decentralized world, associating univocally either a Twitter user-id or a Reddit username to an Ethereum address.
              </p>
            </Col>
            <Col md={3}>
              <h3>What it allows</h3>
              <p>After setting up your <i>tweedentity</i>, anytime that you open a ÐApp integrating Tweedentity, the ÐApp will recognizes
                your Twitter user-id or your Reddit username and authenticate yourself. Automatically.
              </p>
            </Col>
            <Col md={3}>
              <h3>Why it&apos;s great</h3>
              <p>No more username, email, and passwords. Who you are is incised in the blockchain.
              </p>
              <p className="smaller">You may just need
                to confirm your <i>tweedentity</i> signing a verification code with your wallet.</p>
            </Col>
            <Col md={3}>
              <h2>Tweedentity V2 is coming soon. Do not use the V1 because you will waste gas.</h2>


              {/*<p className="centered trynow">*/}
              {/*  <Button*/}
              {/*          onClick={ this.goToApp}*/}
              {/*  >Set your <i>tweedentity</i> now!</Button>*/}
              {/*</p>*/}
            </Col>
          </Row>

        <Row><Col><div className="thinline"><div></div></div></Col></Row>


          <Row>
            <Col md={12}>
              <div className="centered">
                <h1>How it works</h1>
                <p>The Twitter case</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <div className="semicentered"><Badge>1</Badge></div>
              <p>The Tweedentity ÐApp asks your Twitter screen name, retrieves from
                Twitter your user-id (for example &apos;12345&apos;) and starts Metamask to sign a string like
                &apos;twitter/12345&apos; with your wallet.
              </p>

            </Col>
            <Col md={3}>
              <div className="semicentered"><Badge>2</Badge></div>
              <p>After receiving the signature from Metamask, and verifying that it is correct (to avoid
                spending gas for nothing), the ÐApp will ask you to publish it on your Twitter feed.
              </p>
            </Col>
            <Col md={3}>
              <div className="semicentered"><Badge>3</Badge></div>
              <p>When you have done, the ÐApp reads your Twitter feed, detects the tweet containing the
                signature, and asks you to send a fraction of a dollar to the Tweedentity smart contract,
                passing the id of the tweet as data.
              </p>
            </Col>
            <Col md={3}>
              <div className="semicentered"><Badge>4</Badge></div>
              <p>The smart contract uses the fraction of a dollar to pay a third party call to an API which
                retrieves the tweet and verifies that the signature is correct. If so, the smart contract
                saves the new <i>tweedentity</i> in the blockchain. </p>
            </Col>
          </Row>

        <Row><Col><div className="thinline"><div></div></div></Col></Row>

          <Row>
            <Col md={6}>
              <h3>Privacy</h3>
              <p>
                The blockchain is public. If you set
                your <i>tweedentity</i> using a wallet which you usually use to
                send and receive coins, everyone will know all of your
                business.
              </p>
              <p>The best practice is to use a brand new wallet which has no connections with any of your
                other wallets. Though, you need a bit of ether to activate your <i>tweedentity</i>. The best
                way to transfer ether to your brand new identity wallet is to use an exchange.
              </p>
            </Col>
            <Col md={6}>
              <h3>Security</h3>
              <p>
                The blockchain is a very secure technology that nobody
                has
                been able to break in more than ten years from the appearance of Bitcoin. </p>
              <p className="mb9">Tweedentity uses a set of smart contracts in the Ethereum VM, paired with a
                minimal server API, to verify and save your identity. No one but you can set
                your <i>tweedentity</i>
                up. No one but you can remove it from the blockchain. </p>

              <p><a href="https://medium.com/0xnil/introducing-tweedentity-7b6a355c83fb" target="_blank" rel="noreferrer">Read
                more about privacy and security in this intro post</a>
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {/*<h3>Tweedentity vs uPort, Origin, Civic...</h3>*/}
              {/*<p>There are many projects which are working on identity in the Ethereum VM. Most of them adopt the great <a href="https://github.com/ethereum/EIPs/issues/725" target="_blank" rel="noreferrer">EIP-725</a> standard, which allows wallets to make a claim, for example, &quot;I own a Twitter account,&quot; and issuers to verify and confirm the claim. While it is a good approach to decentralized identity, it still requires that we trust the issuers.</p>*/}
              {/*<p>Tweedentity differs from them because it is a self-claim system, which allows people to claim the ownership of a public account and verifies that the claim is true without the need for a trusted issuer.</p>*/}
              {/*<p>To do that it uses public smart contracts and a minimalistic Open Source, serverless API. The whole DApp is Open Source and can be forked and improved by the community.</p>*/}
            </Col>

            <Col md={6}>
              {/*<h3>Components</h3>*/}
              {/*<p><b><a target="_blank" href="https://github.com/Tweedentity/dapp/tree/master/api" rel="noreferrer">Tweedentity API</a></b><br/>A*/}
              {/*  simple API to retrieve a post and verify the signature.</p>*/}
              {/*<p><b><a target="_blank" href="https://github.com/Tweedentity/dapp/tree/master/store" rel="noreferrer">Tweedentity*/}
              {/*  Store</a></b><br/>A set of smart contract to verify and save the <i>tweedentities</i>.</p>*/}
              {/*<p><b><a target="_blank" href="https://dapp.tweedentity.com" rel="noreferrer">Tweedentity ÐApp</a></b><br/>A*/}
              {/*  decentralized app to set a tweedentity and remove an existent*/}
              {/*  one.</p>*/}
              {/*<p><b><a target="_blank" href="https://npmjs.com/package/tweedentity" rel="noreferrer">Tweedentity.js</a></b><br/>A Javascript library for ÐApp developers.</p>*/}
              {/*<p>All the code is in the <a target="_blank" href="https://github.com/tweedentity/dapp" rel="noreferrer">monorepo on Github</a>.</p>*/}
            </Col>
          </Row>

      </Container>
    )
  }
}
