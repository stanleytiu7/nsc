// libraries
import React, {
  PropTypes
} from 'react'
import web3, {
  selectContractInstance,
  mapReponseToJSON
} from '../web3'

// styling
import Avatar from 'material-ui/Avatar'
import {
  List,
  ListItem
} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {
  grey400,
  cyan600,
  white
} from 'material-ui/styles/colors'
import {
  typography
} from 'material-ui/styles'
import Wallpaper from 'material-ui/svg-icons/device/wallpaper'

const TransactionHistory = props => {
  function returnIconMenu(value) { 
    var currBlockObj = web3.eth.getBlock(value)
    const difficulty = parseInt(currBlockObj.difficulty, 10)
    const difficultyTotal = parseInt(currBlockObj.totalDifficulty, 10)
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem style = {styles.tdLabel}>

          <div className="Block">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                      <img src = '/blockchain.png' height= '50'/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Height: </b></td>
                    <td>
                      {currBlockObj.number}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Timestamp: </b></td>
                    <td>
                      {Date(parseInt(currBlockObj.timestamp, 10)).toString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Transactions: </b></td>
                    <td>
			{console.log(currBlockObj)}
                      {parseInt(currBlockObj.transactions.slice().length, 10)}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Hash: </b></td>
                    <td>
                      {currBlockObj.hash}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Parent hash: </b></td>
                    <td> {currBlockObj.parentHash} </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Nonce: </b></td>
                    <td>
                      {currBlockObj.nonce}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Size: </b></td>
                    <td>
                      {currBlockObj.size} bytes
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Difficulty: </b></td>
                    <td>
                      {difficulty}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Total Difficulty: </b></td>
                    <td>
                      {difficultyTotal}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Gas Limit: </b></td>
                    <td>
                      {currBlockObj.gasLimit}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Gas Used: </b></td>
                    <td>
                      {currBlockObj.gasUsed}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Sha3Uncles: </b></td>
                    <td>
                      {currBlockObj.sha3Uncles}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Extra data: </b></td>
                    <td>
                      {currBlockObj.extraData}
                    </td>

                  </tr>
                  <tr>
                    <td className="tdLabel"><b>Miner: </b></td>
                    <td>
                      {currBlockObj.miner}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </MenuItem>
      </IconMenu>
    )
  }

  return (
    <Paper>
      <List>
        <Subheader style={styles.subheader}>Transaction History</Subheader>
        {props.data.map(item =>
          <div name="hash" key={item.title}>
            <ListItem
              leftAvatar={
                <Avatar src={item.text > 0 ? "/no_gas.png" : "/eth.png"} />
             }
              primaryText={item.title}
              secondaryText={'Gas used : ' + item.text + " SCs"}
              rightIconButton={returnIconMenu(item.id)}
            />
            <Divider inset={true} />
          </div>
        )}
      </List>
    </Paper>
  )
}

TransactionHistory.propTypes = {
  data: PropTypes.array
}

export default TransactionHistory

// Utils
const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white
  },
  tdLabel: {
    fontSize: 12,
    lineHeight: '24px'
  }

}

const iconButtonElement = (
  <IconButton touch={true} tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
)
