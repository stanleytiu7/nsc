// libraries
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import web3, {
  selectContractInstance,
  mapReponseToJSON
} from '../components/web3'
import _ from 'lodash'
import $ from 'jquery'
import NotificationSystem from 'react-notification-system'

// components
import InfoBox from '../components/dashboard/InfoBox'
import WalletHistory from '../components/dashboard/WalletHistory'
import BlockchainDistribution from '../components/dashboard/BlockchainDistribution'
import TransactionHistory from '../components/dashboard/TransactionHistory'
import globalStyles from '../styles'
import Data from '../data'
import TodoListContract from 'APP/build/contracts/TodoList.json'
import Checkin from 'APP/app/components/App'

// styling
import ThemeDefault from '../theme-default.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  cyan600,
  pink600,
  purple600,
  orange600,
  red600,
  indigo600,
  blue600,
  green600,
  amber600
} from 'material-ui/styles/colors'
import AccountBalance from 'material-ui/svg-icons/action/account-balance'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Group from 'material-ui/svg-icons/social/group'
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
// thunks
import { fetchAllUsers, fetchUser, postUser } from '../reducers/users.jsx'
import { login, logout, whoami } from '../reducers/auth.jsx'
import { fetchWallet } from '../reducers/wallet.jsx'

class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet: 0,
      transactions: [],
      currentBlockIds: [],
      currentBlockHashes: [],
      currentBlock: null,
      currentBlockGas: [],
      blockData: []
    }
  }

  async componentDidMount() {
    var currentBlockNumber = web3.eth.blockNumber
    this.setState({
      currentBlock: currentBlockNumber
    })
    this.getBlocks(currentBlockNumber)

    this.props.fetchAllUsers()
    await axios
      .get('/api/blockchain/balance')
      .then(res =>
        this.setState({
          wallet: res.data
        })
      )
      .catch(err => console.error('Failed Loading', err))
    await axios
      .get('/api/blockchain/currBlock')
      .then(res =>
        this.setState({
          transactions: res.data
        })
      )
      .catch(err => console.error('Failed loading', err))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div style={styles.container}>
          <h3 style={globalStyles.navigation}> Application / Dashboard</h3>
          <div className="row" style={styles.buttonPadding}>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox
                Icon={AccountBalanceWallet}
                color={pink600}
                title="Coin Amount"
                value={
                  this.state.wallet ? (
                    this.state.wallet.toFixed(2) + ' SCs'
                  ) : (
                    'Loading'
                  )
                }
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox
                Icon={Group}
                color={cyan600}
                title="Current Users"
                value={
                  this.props.users.length ? (
                    this.props.users.length - 1
                  ) : (
                    'Loading'
                  )
                }
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox
                Icon={AccountBalance}
                color={purple600}
                title="Transactions"
                value={
                  this.state.transactions ? this.state.transactions : 'Loading'
                }
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox
                Icon={GroupWork}
                color={orange600}
                title="Peer Nodes"
                value={
                  this.props.users.length ? (
                    this.props.users.length - 1
                  ) : (
                    'Loading'
                  )
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
              <TransactionHistory data={this.state.blockData} />
              <br />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
              <BlockchainDistribution
                data={this.props.users.map(userObject => ({
                  name: userObject.first_name,
                  value: userObject.id,
                  color: colorArr[userObject.id],
                  icon: <ChevronRight />
                }))}
              />
              <br />
              {this.props.user && <Checkin />}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  getBlocks(currentBlockNumber) {
    const currentBlockIds = this.state.currentBlockIds.slice()
    const currentBlockHashes = this.state.currentBlockHashes.slice()
    const currentBlockGas = this.state.currentBlockGas.slice()
    var maxBlocks = 10
    var tableRows = []
    if (currentBlockNumber < maxBlocks) maxBlocks = currentBlockNumber
    for (var i = 0; i < maxBlocks; i++, currentBlockNumber--) {
      var currBlockObj = web3.eth.getBlock(currentBlockNumber)
      currentBlockIds.push(currBlockObj.number)
      currentBlockHashes.push(currBlockObj.hash)
      currentBlockGas.push(currBlockObj.gasUsed)

      tableRows.push({
        id: currBlockObj.number,
        title: currBlockObj.hash,
        text: currBlockObj.gasUsed > 0 ? currBlockObj.gasUsed : '0000'
      })
    }

    this.setState({
      blockData: tableRows
    })
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)

// Utils
const colorArr = [
  cyan600,
  pink600,
  purple600,
  orange600,
  blue600,
  red600,
  indigo600,
  green600,
  amber600
]
const styles = {
  buttonPadding: {
    marginBottom: '20px'
  },
  paddingTop: {
    marginTop: '30px'
  },
  container: {
    paddingLeft: '15px',
    paddingRight: '15px',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
}

function pickRandom() {
  Math.floor(Math.random() * 10)
}
const colorObj = {
  cyan600,
  pink600,
  purple600,
  orange600
}

function pickRandomProperty(obj) {
  var result
  var count = 0
  for (var prop in obj) {
    if (Math.random() < 1 / ++count) result = prop
  }
  return result
}
