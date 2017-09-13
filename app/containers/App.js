// libraries
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import ThemeDefault from '../theme-default'
import Data from '../data'

// styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth'
import Assessment from 'material-ui/svg-icons/action/assessment'
import Web from 'material-ui/svg-icons/av/web'
import PermIdentity from 'material-ui/svg-icons/action/perm-identity'
import GridOn from 'material-ui/svg-icons/image/grid-on'

// menu items

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: false
    }
  }

  componentDidReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({
        navDrawerOpen: nextProps.width === LARGE
      })
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }

  render() {
    const { navDrawerOpen } = this.state
    const paddingLeftDrawerOpen = 256

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft:
          navDrawerOpen && this.props.width !== SMALL
            ? paddingLeftDrawerOpen
            : 0
      }
    }

    const loggedInMenu = this.props.user ? menus.slice(1) : menus
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header
            styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
              this
            )}
          />
          <LeftDrawer
            navDrawerOpen={navDrawerOpen}
            menus={loggedInMenu}
            username={
              this.props.user ? (
                this.props.user.first_name + ' ' + this.props.user.last_name
              ) : null
            }
            img={this.props.user ? this.props.user.img : null}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
              this
            )}
          />

          <div style={styles.container}>{this.props.children}</div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.auth
})

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
}

export default connect(mapStatetoProps)(App)

// menu items
const menus = [
  {
    text: 'Login',
    icon: <PermIdentity />,
    link: '/login'
  }, // Login Page
  {
    text: 'Dashboard',
    icon: <Assessment />,
    link: '/dashboard'
  }, // OLD CODE: Dashboard
  {
    text: 'Send StackCoin',
    icon: <Web />,
    link: '/form'
  }, // Form Page
  {
    text: 'Rankings',
    icon: <PermIdentity />,
    link: '/table'
  }, // Table Page
  {
    text: 'CodeWars',
    icon: <PermIdentity />,
    link: '/codeWars'
  } // Login Page
]
