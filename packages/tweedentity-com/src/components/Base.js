
// const PropTypes = require('prop-types')

const Common = require('./Common')
const clientApi = require('../utils/ClientApi')

class Base extends Common {

  constructor(props) {
    super(props)
    this.bindMany([
      'store',
      'request'
    ])
    this.Store = this.props.Store
  }

  request(api, method, data = {}, query = {}) {
    let accessToken
    if (this.Store && this.Store.accessToken) {
      accessToken = this.Store.accessToken
    }
    return clientApi.request(api, method, accessToken, data, query)
  }

  store(...params) {
    this.props.setStore(...params)
  }

  render() {
    return <div/>
  }
}

// Base.propTypes = {
//   Store: PropTypes.object,
//   setStore: PropTypes.func
// }

module.exports = Base
