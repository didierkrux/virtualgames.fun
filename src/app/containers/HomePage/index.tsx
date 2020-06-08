import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
const randomize = require('randomatic');

export function HomePage() {
  let history = useHistory();
  useEffect((): void => {
    const room = randomize('0', 6);
    // TODO: test if room is already taken on Jitsi
    history.push(`/${room}`);
  }, [history]);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        {/* <meta name="description" content="A Boilerplate application homepage" /> */}
      </Helmet>
      <span>HomePage container</span>
    </>
  );
}
