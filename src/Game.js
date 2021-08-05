import Habitat from './Habitat';

const Game = () => {
  let hab;
  let map = {};
  let coords = {};
  let energy = 0;
  let seeds = 0;

  const verbMenu = [ // TODO: Meditate on these numbers
    // TODO later: adjust these numbers for different habitats/plant types
    {
      verb: 'growShoots',
      cost: 20,
    },
    {
      verb: 'growRoots',
      cost: 20,
    },
    {
      verb: 'newShoot',
      cost: 10,
    },
    {
      verb: 'newRoot',
      cost: 10,
    },
    {
      verb: 'bloom',
      cost: 10,
    },
    {
      verb: 'blossom',
      cost: 20,
    },
    {
      verb: 'fertilize',
      cost: 20,
    },
    {
      verb: 'fruit',
      cost: 50,
    },
    {
      verb: 'ripen',
      cost: 30,
    },
    {
      verb: 'disperse',
      cost: 10,
    },
  ]

  const init = () => {
    // initialize habitat
    hab = Habitat();
    hab.createGrid(10, 10);
    hab.createPlant();

    coords = hab.getCoords();
    map = hab.getMap();

    // initialize energy
    energy = 100;
  }

  const doVerb = (verb) => {
    // enough energy?

    // do it
    const result = hab.doVerb(verb);

    // update things
    map = hab.getMap();

    // return
    return result;
  }

  const getReadyVerbs = () => {
    let verbs = [
      'growShoots',
      'growRoots',
      'newShoot',
      'newRoot',
      'bloom',
    ];
    // plus any flower verbs
    verbs = [...verbs, hab.getFlowerVerbs()];
    

  }

  const getMap = () => map;
  const getEnergy = () => energy;
  const getCoords = () => coords;

  return {
    init,
    doVerb,
    getMap,
    getEnergy,
    getCoords,
  }
}

export default Game;