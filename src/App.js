import { useState } from 'react';

import Game from './Game';

import './App.css';

const XMAX = 9;
const YMAX = 9;

const App = () => {
  const [game, setGame] = useState({});
  const [map, setMap] = useState({});
  const [energy, setEnergy] = useState(0);
  const [time, setTime] = useState(0);

  const newGame = () => {
    const newGame = Game();
    newGame.init();

    setGame(newGame);
    setMap(newGame.getMap());
    setEnergy(newGame.getEnergy());

  }

  const renderMap = () => {
    let habitat = game.getCoords().map( (coord) => {
      // environment
      let pixelDisplay = map[coord].environment;

      if (map[coord].plant) {
        pixelDisplay = map[coord].plant;
      }

      if (map[coord].resource) {
        pixelDisplay = map[coord].resource;
      }
      
      return <div key={ coord } className={ pixelDisplay }> . </div>
    });
    return <div className="habitat">{ habitat }</div>;
  }

  const renderActions = () => {
    
  }

  /////////////
  // render
  if (Object.keys(game).length === 0) {
    return (
      <div className="App">
        <button onClick={ newGame }>New Game</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <button onClick={ newGame }>New Game</button>
        <div className="energy">Energy: { energy }</div>
        { renderMap() }
      </div>
    );
  }
  
}

export default App;
