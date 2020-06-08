import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Game from '../../components/Game';

export function Room() {
  const { room } = useParams();
  return (
    <>
      {/* <Helmet>
        <title>Game</title>
        <meta name="description" content="TODO: customize" />
      </Helmet> */}
      <Game room={room} />
    </>
  );
}
