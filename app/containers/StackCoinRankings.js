// libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PageBase from '../components/PageBase'
import Data from '../data'

// components
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { pink500, grey200, grey500 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'

// thunks
import { fetchAllUsers, fetchUser, postUser } from '../reducers/users.jsx'
import {
  fetchTransactions,
  fetchStackCoinAmounts
} from '../reducers/blockChain.jsx'
import { login, logout, whoami } from '../reducers/auth.jsx'

class StackCoinRankings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: '',
      transactions: 0
    }
  }
  componentWillMount() {
    this.props.fetchStackCoinAmounts()
  }
  render() {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
      },
      editButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: '10%'
        },
        name: {
          width: '40%'
        },
        price: {
          width: '20%'
        },
        category: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    }

    return (
      <PageBase title="Table Page" navigation="Application / Table Page">
        <div>
          <Link to="/form">
            <FloatingActionButton
              style={styles.floatingActionButton}
              backgroundColor={pink500}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>
                  Wallet
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>
                  Send Money
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.stackCoinAmounts.map(user => (
                <TableRow key={user.name}>
                  <TableRowColumn style={styles.columns.id}>
                    {user.value}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>
                    {user.name}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to="/form">
                      <FloatingActionButton
                        zDepth={0}
                        mini={true}
                        backgroundColor={grey200}
                        iconStyle={styles.editButton}
                      >
                        <ContentCreate />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    )
  }
}

const mapStateToProps = state => ({
  stackCoinAmounts: state.blockChain.amounts
})

const mapDispatchToProps = dispatch => ({
  fetchStackCoinAmounts: () => dispatch(fetchStackCoinAmounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(StackCoinRankings)
