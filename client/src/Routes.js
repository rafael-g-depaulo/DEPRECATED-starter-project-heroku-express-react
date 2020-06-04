import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AsyncComponent from 'Components/AsyncComponent'

// all of the names for a specific route
const PageAliases = {
  "Home": [],
}

// all of the components for the pages
const PageComponents = Object
  .keys(PageAliases)
  .map(name => lazy(() => import(`Pages/${name}`)))

// this just adds a '/' to the start of the names for a route
export const routePaths = Object
  .keys(PageAliases)
  .reduce((acc, pageName) => ({
    ...acc,
    [pageName]: [
      ...PageAliases[pageName].map(alias => `/${alias}`),
      `/${pageName}`,     // this adds the page name as an alias to itself
    ]
  }), {})

export const Routes = ({
  ...props
}) => {

  const Home = PageComponents[0]
  return (
    <Router basename="/">
      <Switch>
        {/* landing page */}
        <Route exact path="/">
          <AsyncComponent component={<Home />} />
        </Route>

        {/* home page */}
        <Route path={routePaths.Home}>
          <AsyncComponent component={<Home />} />
        </Route>

      </Switch>
    </Router>
  )
}

export default Routes
