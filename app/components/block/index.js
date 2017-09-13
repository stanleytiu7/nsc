import React, { Component } from 'react'
import './style.css'
import web3, { selectContractInstance, mapReponseToJSON } from '../web3'
import { Link } from 'react-router-dom'

class Block extends Component {
  constructor(props) {
    super(props)
    this.state = {
      block: []
    }
  }

  componentDidMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var blockHash = this.props.match.params.blockHash
    this.getBlockState(blockHash)
  }

  getBlockState(blockHash) {
    console.log('Block hash: ' + blockHash)
    // Use web3 to get the Block object
    var currBlockObj = web3.eth.getBlock(blockHash)
    console.log(JSON.stringify(currBlockObj))
    // Set the Component state
    this.setState({
      block_id: currBlockObj.number,
      blockHash: currBlockObj.hash,
      block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
      block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
      block: currBlockObj
    })
  }

  render() {
    const block = this.state.block
    const difficulty = parseInt(block.difficulty, 10)
    const difficultyTotal = parseInt(block.totalDifficulty, 10)
    return (
      <div className="Block">
        <h2>Block Info</h2>
        <div>
          <table>
            <tbody>
              <tr>
                <td className="tdLabel">Height: </td>
                <td>
                  {this.state.block.number}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Timestamp: </td>
                <td>
                  {this.state.block_ts}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Transactions: </td>
                <td>
                  {this.state.block_txs}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Hash: </td>
                <td>
                  {this.state.block.hash}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Parent hash: </td>
                <td>
                  <Link to={`../block/${this.state.block.parentHash}`}>
                    {this.state.block.parentHash}
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Nonce: </td>
                <td>
                  {this.state.block.nonce}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Size: </td>
                <td>
                  {this.state.block.size} bytes
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Difficulty: </td>
                <td>
                  {difficulty}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Total Difficulty: </td>
                <td>
                  {difficultyTotal}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Limit: </td>
                <td>
                  {block.gasLimit}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Used: </td>
                <td>
                  {block.gasUsed}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Sha3Uncles: </td>
                <td>
                  {block.sha3Uncles}
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Extra data: </td>
                <td>
                  {this.state.block.extraData}
                </td>
                <td className="tdLabel">Miner: </td>
                <td>
                  {this.state.block.miner}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Block
