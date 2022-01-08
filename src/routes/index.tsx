import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  )
}

export default Routes
