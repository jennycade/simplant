import GrowingTip from "./GrowingTip";
import { findMidpoint, parseCoord, unparseCoord } from "./helpers";

const Plant = () => {
  let coords = {};
  let growingTips = [];
  let usedOrigins = [];

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
    const shootStartCoord = findMidpoint(Object.keys(coords), 'shoot');
    const rootStartCoord = findMidpoint(Object.keys(coords), 'root');

    // growing tips
    const shootMeristem = GrowingTip(shootStartCoord, 'u');
    const rootMeristem = GrowingTip(rootStartCoord, 'd');
    growingTips = [shootMeristem, rootMeristem];

    coords[shootStartCoord] = 'shoot';
    coords[rootStartCoord] = 'root';
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
  }

  const growShoots = () => {
    grow('shoot');
  }
  const growRoots = () => {
    grow('root');
  }
  const newShoot = () => {

  }
  const newRoot = () => {

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