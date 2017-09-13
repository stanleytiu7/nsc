// libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// styling
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'
import RaisedButton from 'material-ui/RaisedButton'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import { white, grey900 } from 'material-ui/styles/colors'

// thunks
import { logout } from 'APP/app/reducers/auth'

class Header extends React.Component {
  render() {
    const { styles, handleChangeRequestNavDrawer } = this.props

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
        backgroundColor: '#000000'
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20,
        paddingTop: 5
      }
    }
    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          iconElementLeft={
            <IconButton
              style={style.menuButton}
              onClick={handleChangeRequestNavDrawer}
            >
              <Menu color={white} />
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              {this.props.user ? (
                <FlatButton
                  label="Logout"
                  primary={true}
                  type="submit"
                  onClick={() => {
                    this.props.logout()
                  }}
                />
              ) : (
                <FlatButton
                  label="Sign In"
                  containerElement={<Link to="/login" />}
                />
              )}
            </div>
          }
        />
      </div>
    )
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
