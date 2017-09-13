'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'

import {
  BrowserRouter as Router,
  IndexRedirect,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store'
import WhoAmI from './components/WhoAmI'
import NotFound from './containers/NotFoundPage'
import App from './components/App'
import BlockChain from './components/BlockChain'
import AppBarNav from './components/AppBarNav'
import tempApp from './containers/App'
import TransactionPage from './containers/TransactionPage'
import StackCoinRankings from './containers/StackCoinRankings'
import Dashboard from './containers/DashboardPage'
import LoginPage from './containers/LoginPage.js'
import CodeWars from "./containers/CodeWars.js"
import Block from './components/block'

const ExampleApp = connect(({ auth }) => ({
  user: auth
}))(({ user, children }) =>
  <div>
    <nav>
      {user ? <WhoAmI /> : <Login />}
    </nav>
    {children}
  </div>
)

render(
  <Provider store={store}>

    <Router>
      <Switch>
        <div>
          <Redirect exact path from="/" to="/dashboard" />
          <Route path="/" component={tempApp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/form" component={TransactionPage} />
          <Route exact path="/table" component={StackCoinRankings} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/checkin" component={App} />
          <Route exact path = "/codeWars" component = {CodeWars} />
          <Route path="/block/:blockHash" component={Block} />

        </div>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('main')
)
