import React from 'react'

import { cyan600, pink600, purple600 } from 'material-ui/styles/colors'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const data = {
  dashBoardPage: {
    walletHistory: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    BlockchainDistribution: [
      { name: 'SID', value: 800, color: cyan600, icon: <ExpandMore /> },
      { name: 'KEN', value: 300, color: pink600, icon: <ChevronRight /> },
      { name: 'AATISH', value: 300, color: purple600, icon: <ExpandLess /> },
      { name: 'STANLEY', value: 300, color: pink600, icon: <ExpandLess /> }
    ]
  }
}

export default data
