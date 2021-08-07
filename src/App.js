import { useState } from 'react';

import Game from './Game';

import './App.css';

const XMAX = 9;
const YMAX = 9;
const timeStepMS = 2000;

const App = () => {
  const [game, setGame] = useState({});
  const [map, setMap] = useState({});
  
  const [energy, setEnergy] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);

  const [readyVerbs, setReadyVerbs] = useState([]); // TODO: START HERE NEXT TIME

  const newGame = () => {
    // first kill the old game;
    if (timer) {
      clearInterval(timer);
    }

    const newGame = Game();
    newGame.init(XMAX + 1, YMAX + 1);

    setGame(newGame);
    setMap(newGame.getMap());
    setEnergy(newGame.getEnergy());
    setReadyVerbs(newGame.getReadyVerbs());

    setTimer(setInterval( () => tick(newGame), timeStepMS));
  }

  const tick = (gameToTick) => {
    // make game tick
    gameToTick.tick();

    // update
    setMap(gameToTick.getMap());
    setTime(gameToTick.getTime());
    setReadyVerbs(gameToTick.getReadyVerbs());
    console.log(gameToTick.getReadyVerbs());
  }

  const doVerb = (verb) => {
    // send it to game
    try {
      game.doVerb(verb);
    } catch (error) {
      console.error(error); // Show errors
    }
    
    // update everything
    setMap(game.getMap());
    setEnergy(game.getEnergy);
  }

  const renderMap = () => {
    let habitat = game.getCoords().map( (coord) => {
      // environment
      let pixelDisplay = map[coord].environment;
      let text = '.';
      let harvestable = false;

      if (map[coord].plant) {
        pixelDisplay = map[coord].plant;
      }

      if (map[coord].resource) {
        if (map[coord].resource === 'sun') {
          text = '☀️';
          // harvestable?
          if (map[coord].plant === 'shoot') {
            harvestable = true;
          }
        } else if (map[coord].resource === 'water') {
          text = '💧';
          // harvestable?
          if (map[coord].plant === 'root') {
            harvestable = true;
          }
        }
      }
      
      return <div key={ coord } className={ pixelDisplay } onClick={ harvestable ? () => harvestResource(coord) : undefined }> { text } </div>
    });

    return <div className="habitat">{ habitat }</div>;
  }

  const harvestResource = (coord) => {
    // do it in the game
    game.harvestResource( coord );

    // update map and energy
    setMap(game.getMap());
    setEnergy(game.getEnergy());

    console.log('Harvested resource');
  }

  const renderActions = () => {

    const actions = (
      <div className="actions">
        { readyVerbs.map( verb => <button key={ verb.verb } onClick={ () => doVerb(verb.verb) } >
          { verb.verb } ({ verb.cost })
          </button> )}
      </div>
    );

    return actions;
  }

  /////////////
  // render
  if (Object.keys(game).length === 0) { // no game
    return (
      <div className="App">
        <button onClick={ newGame }>New Game</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="infobar">
          <button onClick={ newGame }>New Game</button>
          <div className="energy">Energy: { energy }</div>
          <div className="time">Day: { time }</div>
        </div>
        { renderMap() }
        { renderActions() }
      </div>
    );
  }
  
}

export default App;
