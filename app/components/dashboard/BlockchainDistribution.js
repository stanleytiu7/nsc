// libraries
import React, { PropTypes, Component } from 'react'
import axios from 'axios'

// styling
import Paper from 'material-ui/Paper'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import GlobalStyles from '../../styles'
import {typography} from 'material-ui/styles'
import {white, pink600} from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  paper: {
    minHeight: 344
  },
  legend: {
    paddingTop: 20
  },
  pieChartDiv: {
    height: 290,
    textAlign: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: pink600,
    padding: 10,
  }
}

class BlockchainDistribution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blockWallet: []
    }
  }

  componentDidMount() {
    axios
      .get('/api/blockchain/blockRankings')
      .then(res =>
        this.setState({
          blockWallet: res.data
        })
      )
      .catch(err => console.error('failedloading', err))
  }

  render() {
    return (
      <Paper style={styles.paper}>
        <div style={{...styles.header}}>Blockchain StackCoin Distribution</div>
        <div style={GlobalStyles.clear} />

        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <div style={styles.loading}>
              <ResponsiveContainer>
                {this.state.blockWallet.length
                  ? <PieChart>
                    <Pie
                      innerRadius={80}
                      outerRadius={130}
                      data={this.state.blockWallet}
                      fill="#8884d8"
                    >
                      {this.state.blockWallet.map(item =>
                        <Cell key={item.value} fill={item.color} />
                      )}
                    </Pie>
                  </PieChart> : <div style={styles.pieChartDiv}><CircularProgress color='#BDBDBD'size={250} thickness={10} /></div>}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div style={styles.legend}>
              <div style={styles.legend}>
                <List>
                  {this.state.blockWallet.map(item =>
                    <ListItem
                      key={item.name}
                      leftAvatar={<Avatar backgroundColor={item.color} />}
                    >
                      {item.name}
                    </ListItem>
                  )}
                </List>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

export default BlockchainDistribution
