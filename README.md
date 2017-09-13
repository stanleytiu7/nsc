# StackCoin
Hi there. This project was an exploration on the implementation of a private ethereum blockchain. It implements two main contracts, a check-in contract which checks a students ip and checkin date before allow them to add themselves to a list. The second contract is one which grants a participating user a small number of stackcoins for levelling up on the codewars website.

# Technologies Used:
React-Redux with Material-ui
Node.js
Express.js
Postgresql
Web3
Truffle
Go-Ethereum
Azure

The front end connects to an express middleware which connects to a postgreql database using sequelize as an ORM. The express middleware also makes web3 calls to the go-ethereum backend which is a series of 6 nodes connected with one another. This series of azure remote servers serve as nodes in a decentralized and each of them hosts a copy of our blockchain.
