import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'
import { grey400, pink600 } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import PageBase from '../components/PageBase'
import axios from 'axios'

import InfoBox from '../components/dashboard/InfoBox'
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'

import CodeWarsContract from 'APP/build/contracts/CodeWars.json'

import { connect } from 'react-redux'

import { addTimesVisited, getTimesVisited } from '../reducers/codeWarsReducer'
import {
  getPreviousCodeWarsPoints,
  addPreviousCodeWarsPoints
} from '../reducers/codeWarsPreviousPointsReducer'

import {
  getCodeWarsStackCoin,
  addCodeWarsStackCoin
} from '../reducers/codeWarsStackCoinReducer'

import web3, {
  selectContractInstance,
  mapReponseToJSON
} from '../components/web3'

class CodeWars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCodeWars: {},
      userPoints: 0,
      account: '0xd3435971d3fe2b2d36e56ab2ff9b407f39fc4fef',
      userAccount: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.deployingContract = this.deployingContract.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async componentWillMount() {
    console.log('user', this.props)

    await this.setState({ userAccount: this.props.user.account })

    await this.props.getAmountOfTimesVisited(this.state.userAccount)

    console.log(
      'componentWillMount amountofTimesVisited, ',
      this.props.timesVisited
    )

    await this.props.getPreviousCodeWarsPoints(this.state.userAccount)

    console.log(
      'componentWillMount amountofTimesVisited, ',
      this.props.previousCodeWarsPoints
    )

    await this.props.getStackCoin(this.state.userAccount)

    console.log(
      'beginning things',
      this.props.timesVisited,
      this.props.previousCodeWarsPoints,
      this.props.codeWarsStackCoinAmount
    )

    // ------------------------------------------------------------
    web3.personal.unlockAccount(
      '0x7a653128323e7c671b04c98527f210cf8f432000',
      'devpatel',
      99999999
    )

    console.dir(web3)
    // ------------------------------------------------------------

    var user
    await axios
      .get('/api/blockchain/codeWars')
      .then(res => res.data)
      .then(userTwo => {
        user = userTwo
        this.setState({ userCodeWars: user })
      })

    if (this.props.timesVisited === 0) {
      console.log('1, inside timesVisited if statement')

      this.props.addAmountOfTimesVisited(this.state.userAccount) // adds 1 to amount of times visited

      this.setState({ userPoints: user.honor })

      await this.props.addPrevCodeWarsPoints(this.state.userAccount, user.honor)

      console.log('Previous points mf: ', this.props.previousCodeWarsPoints)

      await this.props.addAmountOfTimesVisited(this.state.userAccount)
    } else {
      console.log(
        '1, inside else statement, sets user points to 600 while keeping previous points to user.honor'
      )

      this.setState({ userPoints: user.honor }) // COME BACK TO THIS: this.setState({userPoints: user.honor}) //400

      this.props.addAmountOfTimesVisited(this.state.userAccount) // adds 1 to amount of times visited

      console.log(
        'line 107',
        this.props.timesVisited,
        this.state.userPoints,
        this.props.previousCodeWarsPoints
      )
    }

    // console.log("Previous CodeWars Points ", this.props.previousCodeWarsPoints)
    // await this.props.addPrevCodeWarsPoints(this.props.user.account, 300);
    // console.log("New Amount of Previous CodeWars Points", this.props.previousCodeWarsPoints)
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps)

    console.log(
      'line 126',
      this.props.timesVisited,
      this.props.previousCodeWarsPoints,
      this.props.codeWarsStackCoinAmount
    )
  }

  async deployingContract() {
    console.log(
      '2. inside deploying contract method, ',
      this.props.previousCodeWarsPoints,
      this.state.userPoints
    )
    if (
      this.props.previousCodeWarsPoints !== 0 &&
      this.state.userPoints !== 0 &&
      this.props.previousCodeWarsPoints < this.state.userPoints
    ) {
      // this.state.previousPoints !== this.state.userPoints
      const codeWarsContract = await selectContractInstance(CodeWarsContract)
      try {
        await codeWarsContract.addPoints({
          from: this.state.account
        })
      } catch (error) {
        console.log(error)
      }

      this.props.addStackCoin(this.state.userAccount) // add 100 Stack Coin to account

      await setTimeout(
        this.props
          .addPrevCodeWarsPoints(this.state.userAccount, this.state.userPoints)
          .bind(this),
        9000
      )
    }
  }

  render() {
    const style = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    }

    // var that = this;
    // setTimeout(that.deployingContract(), 5000000000);

    this.deployingContract()

    return (
      <PageBase title="CodeWars History" navigation="Application / Form Page">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          {console.log('3, inside info box')}
          <InfoBox
            Icon={ShoppingCart}
            color={pink600}
            title="Code-Wars Coins"
            value={this.props.codeWarsStackCoinAmount}
          />
        </div>
        <div>
          <h1>
            Current CodeWars Points:{' '}
            {this.state.userPoints === 0 ? 'Loading...' : this.state.userPoints}
          </h1>
          <h1>
            Previous CodeWars Points:{' '}
            {this.props.previousCodeWarsPoints === 0 ? (
              'Loading...'
            ) : (
              this.props.previousCodeWarsPoints
            )}
          </h1>
          <h1>
            Amount Of Times CodeWars Been Called:{' '}
            {this.props.timesVisited === 0 ? (
              'Loading...'
            ) : (
              this.props.timesVisited
            )}
          </h1>
        </div>
        <Divider />
        {console.log(this)}
      </PageBase>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  timesVisited: state.codeWars,
  previousCodeWarsPoints: state.codeWarsPreviousPoints,
  codeWarsStackCoinAmount: state.codeWarsStackCoin
})
const mapDispatchToProps = dispatch => ({
  addAmountOfTimesVisited: account => {
    var add = addTimesVisited({ account: account })
    dispatch(add)
  },
  getAmountOfTimesVisited: account => {
    var allTimes = getTimesVisited(account)
    dispatch(allTimes)
  },
  getPreviousCodeWarsPoints: account => {
    var allPreviousPoints = getPreviousCodeWarsPoints(account)
    dispatch(allPreviousPoints)
  },
  addPrevCodeWarsPoints: (account, points) => {
    var addPreviousPoints = addPreviousCodeWarsPoints(account, points)
    dispatch(addPreviousPoints)
  },
  getStackCoin: account => {
    var getCoin = getCodeWarsStackCoin(account)
    dispatch(getCoin)
  },
  addStackCoin: account => {
    var addCoin = addCodeWarsStackCoin(account)
    dispatch(addCoin)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeWars) // is this good
