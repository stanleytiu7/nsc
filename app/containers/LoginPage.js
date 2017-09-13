// libraries
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// styling
import ThemeDefault from '../theme-default'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import { grey500, white } from 'material-ui/styles/colors'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Help from 'material-ui/svg-icons/action/help'
import TextField from 'material-ui/TextField'

// thunks
import { login, logout, whoami } from 'APP/app/reducers/auth'

class LoginPage extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              {!this.props.user ? (
                <form
                  onSubmit={evt => {
                    evt.preventDefault()
                    this.props.login(
                      evt.target.email.value,
                      evt.target.password.value,
                      this.props.history
                    )
                  }}
                >
                  <TextField
                    hintText="E-mail"
                    floatingLabelText="E-mail"
                    fullWidth={true}
                    name="email"
                    type="email"
                  />
                  <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    type="password"
                    name="password"
                  />
                  <div>
                    <RaisedButton
                      label="Login"
                      primary={true}
                      style={styles.loginBtn}
                      type="submit"
                    />
                  </div>
                </form>
              ) : (
                <RaisedButton
                  label={'Logout'}
                  primary={true}
                  type="submit"
                  onClick={() => {
                    this.props.logout()
                  }}
                />
              )}
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.auth
})
const mapDispatchtoProps = (dispatch, props) => ({
  login: (email, password) => {
    dispatch(login(email, password, props.history))
  },
  whoami: () => dispatch(whoami()),
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginPage)

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#4f81e9'
  },
  btnGoogle: {
    background: '#e14441'
  },
  btnSpan: {
    marginLeft: 5
  }
}
