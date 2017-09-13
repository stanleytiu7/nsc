// libaries
import React, {
  PropTypes
} from 'react'

// styling
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import globalStyles from '../styles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ThemeDefault from '../theme-default.js'

const PageBase = (props) => {
  const {
    title,
    navigation
  } = props

  return (
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <div style={style.container}>
        <span style={globalStyles.navigation}>{navigation}</span>

        <Paper style={globalStyles.paper}>
          <h3 style={globalStyles.title}>{title}</h3>

          <Divider/>
          {props.children}

          <div style={globalStyles.clear}/>

        </Paper>
      </div>
    </MuiThemeProvider>

  )
}

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
}

export default PageBase

const style = {
  container: {
    padding: '10px 10px'
  }
}
