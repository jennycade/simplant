import GrowingTip from "./GrowingTip";
import Flower from './Flower';
import { parseCoord, unparseCoord } from "./helpers";

const Plant = (midpoint, midline) => {

  let coords = {};

  // for new shoots and roots
  let growingTips = [];
  let usedOrigins = [];

  // for flowers
  let flowers = [];
  let usedFlowerCoords = [];

  const setCoords = (newCoords) => {
    // takes an array of coord strings, uses that as keys
    // sets coords to be an object with coord keys and 'shoot', 'root', or 'empty'
    for (let i = 0; i < newCoords.length; i++) {
      coords[newCoords[i]] = '';
    }
  }

  // contains functions
  const containsShoot = (coord) => {
    return coords[coord] === 'shoot';
  }
  const containsRoot = (coord) => {
    return coords[coord] === 'root';
  }

  // sprout!
  // make two growing tips: one shoot and one root
  // two pixels at the middle of the grid
  const sprout = () => {

    // growing tips
    const shootMeristem = GrowingTip(midpoint.shoot, 'u');
    const rootMeristem = GrowingTip(midpoint.root, 'd');
    growingTips = [shootMeristem, rootMeristem];

    coords[midpoint.shoot] = 'shoot';
    coords[midpoint.root] = 'root';

    return true;
  }

  // user growth actions
  const doVerb = (verb) => {
    const verbs = {
      'growShoots': () => grow('shoot'),
      'growRoots': () => grow('root'),
      'newShoot': newShoot,
      'newRoot': newRoot,
      'bloom': bloom,
      'blossom': () => doFlowerVerb('blossom'),
      'fertilize': () => doFlowerVerb('fertilize'),
      'fruit': () => doFlowerVerb('fruit'),
      'ripen': () => doFlowerVerb('ripen'),
      'disperse': () => doFlowerVerb('disperse'),
    }

    const result = verbs[verb]();
    return result;
  }

  const doFlowerVerb = (verb) => {
    // iterate through flowers
    for (let i = 0; i < flowers.length; i++) {
      // see if it's available
      if (flowers[i].getNextVerb() === verb && flowers[i].isVerbReady()) {
        // do it
        flowers[i].doVerb(verb);
        // update coords
        coords[flowers[i].getCoord()] = flowers[i].getStage();

        return true;
      }
    }
    return false;
  }

  // verbs
  const grow = (plantPart) => {
    let checkFn;
    if (plantPart === 'shoot') {
      checkFn = 'isShoot';
    }
    if (plantPart === 'root') {
      checkFn = 'isRoot';
    }

    let newCoords = {};

    // iterate over the growing tips
    for (let i = 0; i < growingTips.length; i++) {
      if (growingTips[i][checkFn]()) {
        // grow
        const newCoord = growingTips[i].grow();

        // check to make sure it's on the board
        if (Object.keys(coords).includes(newCoord)) {
          // get ready to add new coord to the plant
          newCoords[newCoord] = plantPart;
        }
        
      }
    }

    if (Object.keys(newCoords).length > 0) {
      // add new coords to the plant
      Object.assign(coords, newCoords);
      return true;
    } else { // growth would have gone off the board
      return false;
    }
  }

  const growShoots = () => {
    return grow('shoot');
  }
  const growRoots = () => {
    return grow('root');
  }

  const newTip = (plantPart) => {
    let ydir = '';
    // encode y direction
    if (plantPart === 'shoot') {
      ydir = 'u';
    }
    if (plantPart === 'root') {
      ydir = 'd';
    }
    // pick an origin
    const coordsArr = Object.keys(coords);
    let potentialOrigins = coordsArr.flatMap(coord => {
      let result = '';
      // coord is on midline; xcoord === midline
      const [x, y] = parseCoord(coord);
      if (x === midline) {
        if (coords[coord] === plantPart) {
          let str = `${coord}${ydir}`; // add u for shoot and r for root
          result = [str+'l', str+'r']; // add l and r for our beautiful 2D plant
        }
      }
      return result;
    });

    potentialOrigins = potentialOrigins.filter(x => x !== '');

    // subtract usedOrigins from potentialOrigins
    const availableOrigins = potentialOrigins.filter(x => !usedOrigins.includes(x));

    if (availableOrigins.length > 0) {

      // choose an origin randomly
      const origin = availableOrigins[Math.floor(Math.random() * availableOrigins.length)];

      // make a new GrowingTip()

      // parse the origin: 'x,yul'
      // TODO: consider writing a parseOriginCode() function (But this might be the only place it gets used)
      const coord = origin.substring(0, origin.length - 2);
      const dir = origin.substring(origin.length - 2);

      // add to growing tips
      const newTip = GrowingTip(coord, dir);
      growingTips.push(newTip);

      // add origin to usedOrigins
      usedOrigins.push(origin);

      return true;
    } else {
      return false;
    }
  }

  const newShoot = () => {
    return newTip('shoot');
  }
  const newRoot = () => {
    return newTip('root');
  }
  const bloom = () => {
    // pick a shoot cell to convert to a flower
    const availableFlowerCoords = [];

    for (const [coord, val] of Object.entries(coords)) {
      if ( !usedFlowerCoords.includes(coord) && val === 'shoot' ) {
        availableFlowerCoords.push(coord);
      }
    }

    const flowerCoord = availableFlowerCoords[Math.floor(Math.random() * availableFlowerCoords.length)];

    // make new Flower()
    const flower = Flower(flowerCoord);
    flowers.push(flower);

    // update coords
    coords[flowerCoord] = flower.getStage(); // TODO: update by stage

    // add to usedFlowerCoords
    usedFlowerCoords.push(flowerCoord);

    return flower;
  }

  const getCoords = () => coords;

  const tick = () => {
    // time progresses for flowers
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].incTime();
    }
  }

  const getSeeds = () => {
    // returns total number of seeds from all flowers
    // TODO: rewrite as a var that gets updated when a flower disperses seeds
    let seeds = 0;
    for (let i = 0; i < flowers.length; i++) {
      seeds += flowers[i].getSeeds();
    }

    return seeds;
  }

  // for dev: count cells
  const countCells = (type) => {
    let numShootCells = 0;
    let numRootCells = 0;
    let numFlowerCells = 0;

    const flowerStages = ['bud', 'flower', 'fertilized flower', 'fruit', 'ripe fruit', 'dispersed seeds'];

    // count the occupied coordinates
    for (const [coord, val] of Object.entries(coords)) {
      if (val === 'shoot') {
        numShootCells++;
      }
      if (val === 'root') {
        numRootCells++;
      }
      if (flowerStages.includes(val)) {
        numFlowerCells++;
      }
    }

    if (type === 'shoot') {
      return numShootCells;
    } else if (type === 'root') {
      return numRootCells;
    } else if (type === 'flower') {
      return numFlowerCells;
    } else {
      return numShootCells + numRootCells + numFlowerCells;
    }
    
  }

  // also (probably) for dev: toString()
  const toString = () => {
    const codes = {
      'shoot':  's',
      'root':   'r',
      'bud':               '1',
      'flower':            '2',
      'fertilized flower': '3',
      'fruit':             '4',
      'ripe fruit':        '5',
      'dispersed seeds':   '6',
    };

    let str = '';
    // coords = {'0,0': '', '1,0': '', ..., 'xmax,ymax': ''}
    // parse last coord
    const coordsArr = Object.keys(coords);
    const lastCoord = coordsArr[coordsArr.length - 1];
    const [xmax, ymax] = parseCoord(lastCoord);

    // iterate row-by-row
    for (let y = 0; y < ymax + 1; y++) {
      for (let x = 0; x < xmax + 1; x++) {
        const status = coords[unparseCoord(x, y)]
        let code = '';

        if (status === '') {
          code = '-';
        } else {
          // first character
          code = codes[status];
        }

        str += code;
      }
      str += '\n';
    }
    return str;
  }

  return {
    coords, getCoords,
    setCoords,
    sprout,
    containsShoot,
    containsRoot,
    // TODO: write containsFlower
    doVerb,
    growShoots, growRoots,
    newShoot, newRoot,
    bloom,
    tick,
    getSeeds,

    countCells,
    toString,
  };
}

export default Plant;