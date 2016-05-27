import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import {MainContainer, HomeContainer} from 'containers'

/**
 * @fbielejec
 */
const routes = (
  <Router history={hashHistory}>
    <Router path='/' component={MainContainer}>

      <IndexRoute component={HomeContainer}/>
    </Router>
  </Router>
)

export default routes
