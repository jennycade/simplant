import Habitat from './Habitat';

const Game = () => {
  let hab;
  let coords = {};
  let energy = 0;
  let seeds = 0;

  const verbMenu = { // TODO: Meditate on these numbers
    // TODO later: adjust these numbers for different habitats/plant types
    'growShoots': 20,
    'growRoots': 20,
    'newShoot': 10,
    'newRoot': 10,
    'bloom': 10,
    'blossom': () => 20,
    'fertilize': () => 20,
    'fruit': () => 50,
    'ripen': () => 30,
    'disperse': () => 10,
  }

  const init = () => {
    // initialize habitat
    hab = Habitat();
    hab.createGrid(10, 10);
    hab.createPlant();

    // coords = hab.getMap();

    // initialize energy
    energy = 100;
  }

  const doVerb = (verb) => {
    // enough energy?

    // do it
    return hab.doVerb(verb);

    // update things
  }

  return {
    init,
    doVerb,
  }
}

export default Game;