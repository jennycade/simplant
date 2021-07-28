import Plant from './Plant';
import Resource from './Resource';
import { parseCoord, unparseCoord } from './helpers';

const Habitat = () => {
  let coords = [];
  let maxCoord = '';
  let plant = null;
  let resources = [];
  let midpoint = {
    shoot: '',
    root: '',
  };
  let midline;
  let soilLine;
  let sunCoords = [];
  let waterCoords = [];

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

  const setResourceCoords = () => {
    // sunCoords = everything with y < soilLine
    // waterCoords = everything with y >= soilLine
    for (let i = 0; i < coords.length; i++) {
      const y = parseCoord(coords[i])[1];
      if (y < soilLine) {
        sunCoords.push(coords[i]);
      } else {
        waterCoords.push(coords[i]);
      }
    }
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

    // set coords for sun and water
    setResourceCoords();

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

  const createSun = () => {
    const sun = Resource('sun', sunCoords);
    resources.push(sun);
  }

  const createWater = () => {
    const water = Resource('water', waterCoords);
    resources.push(water);
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

  const getResources = () => resources;

  const toString = () => {
    // TODO: rewrite this a better way!
    // 1. map resources
    // 2. map plant
    // 3. map environment
    // 4. compile into a string
    let str = '';

    let arr = coords.map(coord => {
      let code = '';

      // resources
      for (let i = 0; i < resources.length; i++) {
        // this is 1000% the slow and stupid way to do this.
        if (resources[i].getCoords().includes(coord)) {
          const type = resources[i].getType();
          if (type === 'sun') {
            code = 'p';
          } else if (type === 'water') {
            code = 'w';
          }
        }
      }

      // plant
      if (plant) {
        if (plant.containsShoot(coord)) {
          code = 's';
        } else if (plant.containsRoot(coord)) {
          code = 'r';
        }
      }

      // abiotic
      if (code === '') {
        const pixel = getAbiotic(coord);
        if (pixel === 'air') {
          code = ' ';
        }
        if (pixel === 'soil') {
          code = '.';
        }
      }

      // end of line
      if (parseCoord(coord)[0] === parseCoord(maxCoord)[0]) {
        code += '\n';
      }
      return code;
    });

    str = arr.join('');

    return str;
  }

  return {
    createGrid,
    createPlant,
    createSun, createWater,
    getMaxCoord, getMidpoint, getMidline,
    getAbiotic,
    getResources,
    toString,
  }
}

export default Habitat;