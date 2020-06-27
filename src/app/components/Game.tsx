import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const Jitsi = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
`;

const GameDiv = styled.div`
  position: absolute;
  background: #eaeaea;
  width: calc(100vw - 375px);
  height: 100vh;
  top: 0;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Control = styled.div`
  position: absolute;
  top: 0;
  right: 4px;
  display: grid;
  img,
  svg {
    border-radius: 50%;
    margin-top: 8px;
    width: 38px;
    cursor: pointer;
  }
  svg {
    margin-bottom: 38px;
  }
`;

const Room = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 375px;
  text-align: center;
  font-size: 15px;
  color: white;
`;

interface GameProps {
  room: string;
}

const Game = ({ room }: GameProps): React.ReactElement => {
  const jitsiRef = useRef(null);
  const [isHost, setIsHost] = useState('no');
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [iframeLink, setNewIframeLink] = useState('');
  const [roomLink, setRoomLink] = useState('');

  useEffect((): void => {
    if (!jitsiApi && jitsiRef) {
      console.log('DKD:init');
      // const domain = '8x8.vc';
      const domain = 'jitsi.toasty.ai';
      const options = {
        roomName: 'virtualgames.fun-' + room,
        width: '100%',
        height: '100%',
        parentNode: jitsiRef.current,
        interfaceConfigOverwrite: {
          // TODO: custom Jitsi background
          // DEFAULT_BACKGROUND: '#eaeaea',
          // DISABLE_FOCUS_INDICATOR: true,
          // /modules/UI/videolayout/SmallVideo.js
          //   if (input.isCurrentlyOnLargeVideo && !input.tileViewEnabled) {
          //     return input.isVideoPlayable && !input.isAudioOnly ? DISPLAY_BLACKNESS_WITH_NAME : DISPLAY_AVATAR_WITH_NAME;
          // }
          // ISSUE -> add !interfaceConfig.filmStripOnly
          // DISABLE_VIDEO_BACKGROUND: false,
          filmStripOnly: true,
          VERTICAL_FILMSTRIP: true,
          // TODO: calculate dynamic size for 5 players
          FILM_STRIP_MAX_HEIGHT: 350,
          REMOTE_THUMBNAIL_RATIO: 16 / 9,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_BUTTONS: ['microphone', 'camera'],
          SHOW_CHROME_EXTENSION_BANNER: false,
          MOBILE_APP_PROMO: false,
          DISABLE_RINGING: true,
          OPTIMAL_BROWSERS: [
            'chrome',
            'chromium',
            'edge',
            'electron',
            'firefox',
            'nwjs',
            'opera',
            'safari',
          ],
        },
      };
      const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      // api.addListener('tileViewChanged', ({ enabled }) => {
      //   if (!enabled) {
      //     api.executeCommand('toggleTileView');
      //   }
      // });
      api.addListener('subjectChange', newRoom => {
        console.log('DKD:subjectChange', newRoom.subject);
        if (newRoom && newRoom.subject && newRoom.subject.length > 0) {
          const isHost: any = document.getElementById('is-host');
          console.log('DKD:isHost', isHost.value);
          if (isHost.value === 'no') {
            console.log('DKD:setNewIframeLink', newRoom.subject);
            setNewIframeLink('');
            const newLink = newRoom.subject;
            setRoomLink(newLink);
            setTimeout(function () {
              setNewIframeLink(newLink);
            }, 100);
          }
          // if (iframe && iframe.src !== 'https://skribbl.io/') {
        }
      });
      // api.addListener('videoConferenceJoined', () => {
      //   // if (newParty) api.executeCommand('subject', room);
      // });
      setJitsiApi(api);
    }
  }, [room, iframeLink, jitsiApi, jitsiRef]);

  const paste = (): void => {
    navigator.clipboard
      .readText()
      .then(text => {
        // alert('replace subject:' + text);
        console.log('DKD:replace subject:', text);
        setIsHost('yes');
        setRoomLink(text);
        if (jitsiApi) jitsiApi.executeCommand('subject', text);
        setTimeout(function () {
          setIsHost('no');
        }, 5000);
      })
      .catch(err => {
        alert(err);
      });
  };

  const newGame = (gameLink): void => {
    setNewIframeLink('');
    setTimeout(function () {
      setNewIframeLink(gameLink);
    }, 100);
  };

  const GAMES = [
    {
      label: 'skribbl.io - drawing guessing',
      img: '/assets/games/skribbl.io.png',
      link: 'https://skribbl.io/',
    },
    {
      label: 'gartic.io - drawing guessing',
      img: '/assets/games/gartic.io.png',
      link: 'https://gartic.io/create',
    },
    {
      label: 'Limite Limite - French version of Cards Against Humanity',
      img: '/assets/games/limitelimite.png',
      link: 'https://limitelimiteenligne.com/',
    },
    {
      label: 'Minecraft classic',
      img: '/assets/games/minecraft.jpg',
      link: 'https://classic.minecraft.net/',
    },
    {
      label: 'Counter-Strike 1.6',
      img: '/assets/games/counterstrike.png',
      link: 'https://cs-online.club/en/servers',
    },
  ];

  return (
    <>
      <Jitsi ref={jitsiRef} id="jitsi" />
      <GameDiv>
        {iframeLink.length ? (
          <iframe id="iframe" src={iframeLink} title="game" />
        ) : null}
      </GameDiv>
      <Control>
        <Tooltip title="Share game link" placement="left">
          <svg
            height="36px"
            width="36px"
            viewBox="0 0 36 36"
            transform="scale (-1, 1)"
            transform-origin="center"
            onClick={paste}
          >
            <g
              id="reply"
              fill="none"
              fill-rule="evenodd"
              stroke="none"
              stroke-width="1"
            >
              <polygon id="Fill-20" points="0 36 36 36 36 0 0 0"></polygon>
              <path
                id="Fill-19"
                d="M16.2785894,26.6946832 C17.4409207,27.4920577 18.9988647,26.6347303 18.9988647,25.197358 L18.9988647,21.9938712 C23.9932881,21.9938712 26.8856124,22.9656089 27.8513876,25.9083002 C28.119464,26.7256589 28.5055741,26.989452 28.9662054,26.989452 C29.5883827,26.989452 30,26.5722793 30,25.9782453 C29.9989997,18.2243286 26.1404,14.0011418 18.9988647,14.0011418 L18.9988647,10.8021516 C18.9988647,9.36527885 17.4409207,8.50795146 16.2785894,9.30532589 L5.77909704,16.5026793 C4.74030099,17.2146207 4.74030099,18.7843892 5.77909704,19.4968303 L16.2785894,26.6946832 Z"
                fill="#e84149"
              ></path>
            </g>
          </svg>
        </Tooltip>
        {GAMES.map(g => (
          <Tooltip title={g.label} placement="left">
            <img
              src={`${g.img}`}
              onClick={() => {
                newGame(g.link);
              }}
              alt={g.label}
            />
          </Tooltip>
        ))}
        <input id="is-host" type="hidden" value={isHost} />
      </Control>
      <Room>{roomLink}</Room>
    </>
  );
};

export default Game;
