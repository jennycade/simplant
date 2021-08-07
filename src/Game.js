import Habitat from './Habitat';

const Game = () => {
  const resourceFreq = 3;

  let hab;
  let map = {};
  let coords = {};
  // let readyVerbs = [];
  let energy = 0;
  let seeds = 0;
  let time = 0;

  const verbMenu = [ // TODO: Meditate on these numbers
    // TODO later: adjust these numbers for different habitats/plant types
    {
      verb: 'growShoots',
      cost: 20,
      area: 'shoot',
    },
    {
      verb: 'growRoots',
      cost: 20,
      area: 'root',
    },
    {
      verb: 'newShoot',
      cost: 10,
      area: 'shoot',
    },
    {
      verb: 'newRoot',
      cost: 10,
      area: 'root',
    },
    {
      verb: 'bloom',
      cost: 10,
      area: 'shoot',
    },
    {
      verb: 'blossom',
      cost: 20,
      area: 'flower',
    },
    {
      verb: 'fertilize',
      cost: 20,
      area: 'flower',
    },
    {
      verb: 'fruit',
      cost: 50,
      area: 'flower',
    },
    {
      verb: 'ripen',
      cost: 30,
      area: 'flower',
    },
    {
      verb: 'disperse',
      cost: 10,
      area: 'flower',
    },
  ]

  const init = (width, length) => {
    // initialize habitat
    hab = Habitat();
    hab.createGrid(width, length);
    hab.createPlant();

    coords = hab.getCoords();
    map = hab.getMap();

    // initialize energy
    energy = 100;

  }


  const createResource = () => {
    // flip a coin: water or sun?
    const resources = ['createWater', 'createSun'];
    const type = resources[Math.floor(Math.random() * resources.length )];
    // call hab.createSun() or hab.createWater();
    hab[type]();

    // don't update map here; this should only be called by tick();
  }

  const harvestResource = ( coord ) => {
    // remove from habitat
    hab.harvestResource(coord);

    // add energy
    energy += 25;

    // update map
    map = hab.getMap();
  }

  const tick = () => {
    // flip a coin: create a resource?
    const roll = Math.floor(Math.random() * resourceFreq);
    if (roll === 0) { // success
      createResource();
    }

    // tick the habitat along
    hab.tick();

    // update map
    map = hab.getMap();

    // update time
    time ++;
  }

  const doVerb = (verb) => {
    // is verb ready?
    // if (! getReadyVerbs().includes(verb)) {
    //   // throw new Error(`${verb} is not available.`); // TODO: fix how this is structured
    // }

    // enough energy?
    const cost = verbMenu.filter( x => x.verb === verb)[0].cost;

    if (cost > energy) { // not enough energy
      throw new Error(`Not enough energy`);
    }

    // do it
    const result = hab.doVerb(verb);

    if (result) {
      // deduct energy
      energy -= cost;
    } else {
      throw new Error(`Cannot ${verb}`);
    }

    // update things
    map = hab.getMap();
    seeds = hab.getSeeds();

    // return
    return result;
  }

  const getReadyVerbs = () => { // TODO: Make readyVerbs a variable and update when necessary
    let verbs = [
      'growShoots',
      'growRoots',
      'newShoot',
      'newRoot',
      'bloom',
    ];
    // plus any flower verbs
    const flowerVerbs = hab.getFlowerVerbs()[1]; // hab.getFlowerVerbs() returns [arr nextVerbs, arr readyVerbs]
    verbs = [...verbs, flowerVerbs].flat();
    
    // return verbMenu if verb in verbs
    return verbMenu.filter( x => verbs.includes(x.verb));
  }

  const getMap = () => map;
  const getEnergy = () => energy;
  const getCoords = () => coords;
  const getSeeds = () => seeds;
  const getTime = () => time;

  return {
    init,
    doVerb,
    harvestResource,
    tick,
    getReadyVerbs,
    getMap,
    getEnergy,
    getCoords,
    getSeeds,
    getTime,
  }
}

export default Game;