import Plant from './Plant';
import { parseCoord, unparseCoord } from './helpers';

const Habitat = () => {
  let coords = [];
  let maxCoord = '';
  let plant = null;
  let midpoint = {
    shoot: '',
    root: '',
  };
  let midline;
  let soilLine;

  const setMidpoint = () => { 
    const [xmax, ymax] = parseCoord(maxCoord);
  
    // find mid x coord
    const xmid = Math.floor(xmax / 2);
  
    // find mid y coord
    const ymidShoot = Math.floor(ymax / 2);
    const ymidRoot = ymidShoot + 1;
  
    // set value
    midpoint.shoot = unparseCoord(xmid, ymidShoot);
    midpoint.root = unparseCoord(xmid, ymidRoot);

    // set soilLine too
    soilLine = ymidRoot;
  }

  const setMidline = () => {
    const xmax = parseCoord(maxCoord)[0];
    midline = Math.floor(xmax / 2);
  }

  const createGrid = (width, height) => {
    coords = [];
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const coord = `${x},${y}`; // x,y
        coords.push(coord);
      }
    }
    maxCoord = `${width - 1},${height - 1}`;

    // set midpoints
    setMidpoint();

    // set midline
    setMidline();

    return coords; // ['0,0', '1,0', '2,0', ..., 'width,height']
  }

  const createPlant = () => {
    plant = Plant(midpoint, midline);

    // setCoords
    plant.setCoords(coords);

    return plant;
  }

  const getMaxCoord = () => maxCoord;

  const getMidpoint = (type) => {
    return midpoint[type];
  }
  const getMidline = () => midline;

  const getAbiotic = (coord) => {
    const [x, y] = parseCoord(coord);
    if (y < soilLine) {
      return 'air';
    } else {
      return 'soil';
    }
  }

  return {
    createGrid,
    createPlant,
    getMaxCoord, getMidpoint, getMidline,
    getAbiotic,
  }
}

export default Habitat;