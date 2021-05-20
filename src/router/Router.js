import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  HomePage,
  NotFoundPage
} from '../pages'

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router