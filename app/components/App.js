// libraries
import React, { Component } from 'react'
import $ from 'jquery'
import NotificationSystem from 'react-notification-system'
import web3, { selectContractInstance, mapReponseToJSON } from './web3'
import { connect } from 'react-redux'

// imported componenets
import TodoListContract from 'APP/build/contracts/TodoList.json'

// styling
import styled, { injectGlobal } from 'styled-components'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { typography } from 'material-ui/styles'
import { white, purple600 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

// vars for changing
const accountNumber = '0xd3435971d3fe2b2d36e56ab2ff9b407f39fc4fef'

const styles = {
  paper: {
    minHeight: 344
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: purple600,
    padding: 10
  }
}
class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todoItems: [],
      newItem: '',
      account: accountNumber,
      pending: false,
      calling: false,
      checkInDate: '',
      disabled: true,
      ip: '',
      today: '',
      previousDate: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteTodoItem = this.deleteTodoItem.bind(this)
    this.addAlert = this.addAlert.bind(this)
    this.clearAlert = this.clearAlert.bind(this)
  }

  render() {
    return (
      <Paper style={styles.paper}>
        <div style={styles.header}>Daily Student Check In</div>
        <div className="container-fluid">
          <PendingContainer style={{ leftPadding: '10px', topPadding: '10px' }}>
            <Pending
              className="col-6"
              active={this.state.pending}
              activeColor="red"
            >
              Transaction Pending
            </Pending>
            <Pending
              className="col-6"
              active={this.state.calling}
              activeColor="#5eef8b"
            >
              Reading Blockchain
            </Pending>
          </PendingContainer>

          {this.props.user && this.state.previousDate ? (
            <form onSubmit={evt => this.handleSubmit(evt)}>
              <RaisedButton
                label="Check-in"
                type="submit"
                disabled={this.state.disabled}
                fullWidth={true}
              />
            </form>
          ) : (
            <CircularProgress color="#BDBDBD" size={40} thickness={5} />
          )}

          <List className="col 10">
            <div style={{ texAlign: 'center' }}> Checked-in Students </div>
            <hr />
            {this.state.todoItems.map((item, itemIndex) => (
              <TodoItem className="col 12" key={itemIndex}>
                <ItemLabel>{item.value}</ItemLabel>
                <DestroyBtn onClick={() => this.deleteTodoItem(itemIndex)}>
                  x
                </DestroyBtn>
              </TodoItem>
            ))}
          </List>
        </div>
      </Paper>
    )
  }

  async componentWillMount() {
    // await the ip address to come in
    const studentData = await axios.get('https://freegeoip.net/json/')

    // await the last checkin date to come in
    await axios
      .get('/api/users/checkindate/' + this.props.user.id)
      .then(res =>
        this.setState({
          checkInDate: res.data.last_check_in
        })
      )
      .catch(function(reject) {
        console.log(reject)
      })
    web3.personal.unlockAccount(
      '0x7a653128323e7c671b04c98527f210cf8f432000',
      'devpatel',
      99999999
    )
    // await the select contract instances
    this.todoList = await selectContractInstance(TodoListContract)
    const todoItems = await this.getTodoItems()

    this.setState({
      todoItems
    })

    let cDate = this.state.checkInDate
    const cDay = cDate.substr(8, 2)
    const cMonth = cDate.substr(5, 2)
    const cYear = cDate.substr(0, 4)

    cDate = cMonth + '/' + cDay + '/' + cYear

    // check the last check in date
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    const yyyy = today.getFullYear()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    today = mm + '/' + dd + '/' + yyyy

    this.setState({
      studentData: studentData.data,
      previousDate: cDate,
      today: today
    })

    // if both the student ip and the date are correct, let them press the button
    if (
      this.state.studentData.ip === '71.190.247.98' &&
      this.state.today !== this.state.previousDate
    ) {
      this.setState({
        disabled: false
      })
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    // set the state to the current logged in user name, email
    this.setState({
      newItem:
        this.props.user.first_name +
        ' ' +
        this.props.user.last_name +
        ', ' +
        this.props.user.email
    })
    // just another precaution in case something went funny with the Will Mount
    if (
      this.state.studentData.ip === '71.190.247.98' &&
      this.state.today !== this.state.previousDate
    ) {
      // now you can't click the button
      this.setState({
        disabled: true
      })

      var updateDate = {
        id: this.props.user.id,
        date: Date.now()
      }
      // updating the db
      await axios
        .put('/api/users/checkin/', updateDate)
        .then(res =>
          this.setState({
            checkInDate: Date.now()
          })
        )
        .catch(function(reject) {
          console.log(reject)
        })

      this.setState({
        pending: true
      })
      const todoList = await selectContractInstance(TodoListContract)
      await todoList.addTodoItem(this.state.newItem, {
        from: this.state.account
      })
      const todoItems = await this.getTodoItems()

      this.setState({
        todoItems,
        pending: false
      })
    }
  }

  async getTodoItems() {
    this.setState({
      calling: true
    })

    const todoItemsResp = await this.todoList.getTodoItems.call()
    const todoItems = mapReponseToJSON(
      todoItemsResp,
      ['value', 'active'],
      'arrayOfObject'
    )

    this.setState({
      calling: false
    })
    return todoItems
  }

  async deleteTodoItem(position) {
    this.setState({
      pending: true
    })
    await this.todoList.deleteTodoItem(position, {
      from: this.state.account
    })
    const todoItems = await this.getTodoItems()

    this.setState({
      todoItems,
      pending: false
    })
  }

  addAlert() {
    this.refs.container.success('hi!', {
      closeButton: true
    })
  }

  clearAlert() {
    this.refs.container.clear()
  }
}

const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(TodoList)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  color: #ead7d7;
  font-size: 30px;
  margin-bottom: -20px;
`

const H2 = styled.h2`
  color: #d2bebe;
  font-size: 20px;
`

const TodoListContainer = styled.section`
  background: #303030;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`

const InputText = styled.input`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  width: 440px;
  position: relative;
  margin: 0;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  &:focus {
    outline: none;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const TodoItem = styled.li`
  position: relative;
  font-size: 16px;
  border-bottom: 1px solid #ededed;
  &:last-child {
    border-bottom: none;
  }
`

const ItemLabel = styled.label`
  display: inline-block;
  line-height: 1.2;
  transition: color 0.4s;
`

const Button = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  appearance: none;
  font-smoothing: antialiased;
  outline: none;
`

const DestroyBtn = styled(Button)`
  padding-left: 5px;
  font-size: 16px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  cursor: pointer;
`

const PendingContainer = styled.div``

const Pending = styled.div`
  color: ${props => (props.active ? props.activeColor || 'red' : '#c7c7c7')};
`

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  body {
    background-color: #212121;
    font-family: 'Roboto', sans-serif;
  }
  `
