// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import PageBase from '../components/PageBase'

// styling
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'
import { grey400 } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

// thunks
import { fetchAllUsers, fetchUser, postUser } from '../reducers/users.jsx'

class TransactionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserId: this.props.currentUserId,
      receiverId: '',
      amount: '',
      memo: ''
    }
  }

  handleClear = () => {
    this.setState({
      memo: '',
      receiverId: '',
      amount: ''
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const transactionObject = {
      from: this.state.currentUserId,
      to: this.props.users.find(
        user => user.first_name === this.state.receiverId
      ).account,
      value: this.state.amount
    }

    var message = this.state.amount + ' StackCoins sent!'
    window.alert(message)

    axios
      .post('/api/blockchain/trans', transactionObject)
      .then(res => res.data)
      .then(newTransactions => {
        window.alert('StackCoins Sent!', ' (', this.state.amount, ')')
      })
  }

  handleMemoChange = event => {
    this.setState({
      memo: event.target.value
    })
  }

  handleReceiverChange = event => {
    console.log(event.target.textContent)
    this.setState({
      receiverId: event.target.textContent
    })
  }

  handleAmountChange = event => {
    this.setState({
      amount: event.target.value
    })
  }

  async componentDidMount() {
    await axios
      .get('/api/blockchain/user')
      .then(res => res.data)
      .then(user => {
        this.setState({
          currentUserId: user
        })
      })
  }

  render() {
    return (
      <PageBase
        title="Conduct Transaction"
        navigation="Application / Form Page"
      >
        <form>
          <SelectField
            onChange={evt => this.handleReceiverChange(evt)}
            floatingLabelText="Send Money To:"
            name="sendTo"
            value={this.state.receiverId}
            autoWidth={true}
          >
            {this.props.users.map(user => (
              <MenuItem
                key={user.id}
                value={user.first_name}
                primaryText={user.first_name}
              />
            ))}
          </SelectField>
          <TextField
            onChange={evt => this.handleAmountChange(evt)}
            floatingLabelText="StackCoin Amount"
            name="amount"
            fullWidth={true}
            value={this.state.amount}
          />
          <TextField
            onChange={evt => this.handleMemoChange(evt)}
            hintText="Memo Text"
            floatingLabelText="Memo Text"
            fullWidth={true}
            value={this.state.memo}
          />
          <div style={style.buttons}>
            <RaisedButton label="Clear" onClick={this.handleClear} />
            <RaisedButton
              label="Send Wei"
              style={style.saveButton}
              type="submit"
              primary={true}
              onClick={this.handleSubmit}
            />
            {console.log('the props yo', this.props)}
            {console.log('the state yo', this.state)}
          </div>
        </form>
      </PageBase>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage)

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
    marginLeft: 15
  }
}
