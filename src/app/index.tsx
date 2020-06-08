/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { Room } from './containers/Room/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - VirtualGames.fun"
        // defaultTitle="React Boilerplate"
      >
        {/* <meta name="description" content="A React Boilerplate application" /> */}
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:room(\d{6})" component={Room} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
