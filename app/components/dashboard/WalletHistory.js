// libraries
import React, {PropTypes} from 'react'

// styling
import Paper from 'material-ui/Paper'
import {white, purple600} from 'material-ui/styles/colors'
import {LineChart, Line, ResponsiveContainer} from 'recharts'
import {typography} from 'material-ui/styles'

const WalletHistory = (props) => {
  const styles = {
    paper: {
      backgroundColor: '#303030',
      height: 150
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px'
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: purple600,
      padding: 10,
    }
  }

  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>Wallet Timeline</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}

WalletHistory.propTypes = {
  data: PropTypes.array
}

export default WalletHistory
