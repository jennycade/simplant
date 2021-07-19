import GrowingTip from "./GrowingTip";
import { findMidline, findMidpoint, parseCoord, unparseCoord } from "./helpers";

const Plant = () => {
  let coords = {};
  let midline;
  let growingTips = [];
  let usedOrigins = [];

  const setCoords = (newCoords) => {
    // takes an array of coord strings, uses that as keys
    // sets coords to be an object with coord keys and 'shoot', 'root', or 'empty'
    for (let i = 0; i < newCoords.length; i++) {
      coords[newCoords[i]] = '';
    }
    midline = findMidline(newCoords);
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
    const shootStartCoord = findMidpoint(Object.keys(coords), 'shoot');
    const rootStartCoord = findMidpoint(Object.keys(coords), 'root');

    // growing tips
    const shootMeristem = GrowingTip(shootStartCoord, 'u');
    const rootMeristem = GrowingTip(rootStartCoord, 'd');
    growingTips = [shootMeristem, rootMeristem];

    coords[shootStartCoord] = 'shoot';
    coords[rootStartCoord] = 'root';

    return true;
  }

  // user growth actions
  const grow = (plantPart) => {
    let checkFn;
    if (plantPart === 'shoot') {
      checkFn = 'isShoot';
    }
    if (plantPart === 'root') {
      checkFn = 'isRoot';
    }

    // iterate over the growing tips
    for (let i = 0; i < growingTips.length; i++) {
      if (growingTips[i][checkFn]()) {
        // grow
        const newCoord = growingTips[i].grow();
        // add new coord to the plant
        coords[newCoord] = plantPart;
      }
    }

    return true;
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
  }

  const newShoot = () => {
    return newTip('shoot');
  }
  const newRoot = () => {
    return newTip('root');
  }
  const bloom = () => {}

  // for dev: count cells
  const countCells = (type) => {
    let numShootCells = 0;
    let numRootCells = 0;

    // count the occupied coordinates
    for (const [coord, val] of Object.entries(coords)) {
      if (val === 'shoot') {
        numShootCells++;
      }
      if (val === 'root') {
        numRootCells++;
      }
    }

    if (type === 'shoot') {
      return numShootCells;
    } else if (type === 'root') {
      return numRootCells;
    } else {
      return numShootCells + numRootCells;
    }
    
  }

  // also (probably) for dev: toString()
  const toString = () => {
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
          code = status.substring(0, 1);
        }

        str += code;
      }
      str += '\n';
    }
    return str;
  }

  return {
    coords,
    setCoords,
    sprout,
    containsShoot,
    containsRoot,
    growShoots, growRoots,
    newShoot, newRoot,
    bloom,

    countCells,
    toString,
  };
}

export default Plant;