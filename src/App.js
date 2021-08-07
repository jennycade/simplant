import { useState } from 'react';

import Game from './Game';

import './App.css';

const XMAX = 9;
const YMAX = 9;
const timeStepMS = 2000;
const SEASON = 200;

const App = () => {
  const [display, setDisplay] = useState('new');

  const [game, setGame] = useState({});
  const [map, setMap] = useState({});
  
  const [energy, setEnergy] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [seeds, setSeeds] = useState(0);

  const [readyVerbs, setReadyVerbs] = useState([]);

  const newGame = () => {
    // first kill the old game;
    if (timer) {
      clearInterval(timer);
    }

    setDisplay('play');

    const newGame = Game();
    newGame.init(XMAX + 1, YMAX + 1);

    setGame(newGame);
    setMap(newGame.getMap());
    setEnergy(newGame.getEnergy());
    setSeeds(newGame.getSeeds());
    setReadyVerbs(newGame.getReadyVerbs());

    setTimer(setInterval( () => tick(newGame), timeStepMS));
  }

  const tick = (gameToTick) => {
    // make game tick
    gameToTick.tick();

    // is the season over?
    if (gameToTick.getTime() > SEASON) {
      endGame();
    } else {
      // update
      setMap(gameToTick.getMap());
      setTime(gameToTick.getTime());
      setReadyVerbs(gameToTick.getReadyVerbs());
    }
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
    setReadyVerbs(game.getReadyVerbs());
    setEnergy(game.getEnergy());
    setSeeds(game.getSeeds());
  }

  const harvestResource = (coord) => {
    // do it in the game
    game.harvestResource( coord );

    // update map and energy
    setMap(game.getMap());
    setEnergy(game.getEnergy());

    console.log('Harvested resource');
  }

  const endGame = () => {
    // kill the game
    if (timer) {
      clearInterval(timer);
    }
    // update display
    setDisplay('end');
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

      // flowers
      if (['flower', 'fertilized flower'].includes(map[coord].plant)) {
        text = '🌸';
      }
      if (['fruit', 'ripe fruit'].includes(map[coord].plant)) {
        text = '🍓';
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

  const renderActions = () => {

    const actions = (
      <div className="actions">
        { readyVerbs.map( verb => <button key={ verb.verb } onClick={ () => doVerb(verb.verb) } >
          { verb.verb } ⚡️{ verb.cost }
          </button> )}
      </div>
    );

    return actions;
  }

  const showInstructions = () => {
    // pause
    // kill the timer
    if (timer) {
      clearInterval(timer);
    }

    // change display
    setDisplay('instructions');
  }

  const hideInstructions = () => {
    // set display
    setDisplay('play');

    // unpause
    setTimer(setInterval( () => tick(game), timeStepMS));
  }

  const instructions = (
    <div className="instructions">
      <p>Welcome to Pixel Plant!</p>
      <p>It's spring, and your pixel plant seed has just sprouted.</p>
      <p>As a plant, you need to soak up sunlight from your shoots and water from your roots to store ⚡️ energy in the form of sugar.</p>
      <p>Use stored ⚡️ energy to grow, bloom new 🌸 flowers, and make those flowers form 🍓 fruits and disperse 🌰 seeds.</p>

      <p>How many 🌰 seeds can you disperse before the end of the growing season in 200 days?</p>
      <button onClick={ hideInstructions }>Start growing</button>
    </div>
  );

  /////////////
  // render
  if (display === 'new' || Object.keys(game).length === 0) { // no game
    return (
      <div className="App">
        <button onClick={ newGame }>New Game</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="infobar">
          <p>PixelPlant</p>
          <button onClick={ showInstructions }>ℹ️ Instructions</button>
          <div className="energy">Energy: ⚡️{ energy }</div>
          <div className="time">Day: 🕑 { time } / { SEASON }</div>
          <div className="seeds">Seeds: 🌰 { seeds }</div>
        </div>
        { renderMap() }
        { display === 'play' ? renderActions() : display === 'instructions' ? instructions : (<p className="end">The growing season is over. Your plant dispersed { seeds } 🌰 seeds this season.</p>) }
      </div>
    );
  }
  
}

export default App;
