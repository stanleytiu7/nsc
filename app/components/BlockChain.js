// libraries
import React, { Component } from 'react'
import web3, { selectContractInstance, mapReponseToJSON } from './web3'
import _ from 'lodash'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class BlockChain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBlockIds: [],
      currentBlockHashes: [],
      currentBlock: null,
      currentBlockGas: []
    }
  }

  componentDidMount() {
    var currentBlockNumber = web3.eth.blockNumber
    this.setState({
      currentBlock: currentBlockNumber
    })
    this.getBlocks(currentBlockNumber)
  }

  getBlocks(currentBlockNumber) {
    const currentBlockIds = this.state.currentBlockIds.slice()
    const currentBlockHashes = this.state.currentBlockHashes.slice()
    const currentBlockGas = this.state.currentBlockGas.slice()
    var maxBlocks = 10
    if (currentBlockNumber < maxBlocks) maxBlocks = currentBlockNumber
    for (var i = 0; i < maxBlocks; i++, currentBlockNumber--) {
      var currBlockObj = web3.eth.getBlock(currentBlockNumber)
      currentBlockIds.push(currBlockObj.number)
      currentBlockHashes.push(currBlockObj.hash)
      currentBlockGas.push(currBlockObj.gasUsed)
    }

    this.setState({
      currentBlockIds: currentBlockIds,
      currentBlockHashes: currentBlockHashes,
      currentBlockGas: currentBlockGas
    })
  }

  render() {
    console.log('web3 objects', web3)

    var tableRows = []
    _.each(this.state.currentBlockIds, (value, index) => {
      tableRows.push(
        <tr key={this.state.currentBlockHashes[index]}>
          <td className="tdCenter">
            {this.state.currentBlockIds[index]}
          </td>
          <td>
            <Link to={`/block/${this.state.currentBlockHashes[index]}`}>
              {this.state.currentBlockHashes[index]}
            </Link>
            {this.state.currentBlockGas[index] > 0
              ? <img src="/eth.png" height="28" width="28" />
              : ''}
          </td>
        </tr>
      )
    })

    return (
      <div className="Home">
        <h2>Home page</h2>
        Current Block: {this.state.currentBlock}
        <table>
          <thead>
            <tr>
              <th>Block No</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default BlockChain
