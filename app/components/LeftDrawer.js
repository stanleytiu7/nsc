// libraries
import React, { PropTypes, Component } from 'react'

// styling
import Drawer from 'material-ui/Drawer'
import { spacing, typography } from 'material-ui/styles'
import { white, grey900 } from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

class LeftDrawer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Drawer docked={true} open={this.props.navDrawerOpen}>
        <div style={styles.logo}>StackCoin</div>
        {this.props.username && (
          <div style={styles.avatar.div}>
            <Avatar src={this.props.img} size={50} style={styles.avatar.icon} />
            <span style={styles.avatar.span}>{this.props.username}</span>
          </div>
        )}
        <div>
          {this.props.menus.map((menu, index) => (
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text} // {menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link} />}
              onClick={evt => {
                this.props.handleChangeRequestNavDrawer()
              }}
            />
          ))}
        </div>
      </Drawer>
    )
  }
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string
}

export default LeftDrawer

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: '#000000',
    paddingLeft: 40,
    height: 56
  },
  menuItem: {
    color: white,
    fontSize: 14
  },
  avatar: {
    div: {
      padding: '15px 0 20px 15px'
    },
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
    },
    span: {
      paddingTop: 12,
      display: 'block',
      color: 'white',
      fontWeight: 300,
      textShadow: '1px 1px #444'
    }
  }
}
