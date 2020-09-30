import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { render } from 'react-dom'
import Mainasd from './mainBoard'
import Qa from './qAScreen'
// First we import some modules...
import { Router, Route } from 'react-router'
import { Switch } from 'react-router-dom'

// Then we delete a bunch of code from App and
// add some <Link> elements...
export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Mainasd />
        </Route>
        <Route path="qa">
          <Qa />
        </Route >
      </Switch>
    </main>
  )
}
