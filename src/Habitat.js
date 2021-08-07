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

  let map = {};

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

    // sprout
    plant.sprout();

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
    const y = parseCoord(coord)[1];
    if (y < soilLine) {
      return 'air';
    } else {
      return 'soil';
    }
  }

  const getResources = () => resources;

  const harvestResource = (coord) => {
    // remove resource at that coord
    resources = resources.filter(x => ! x.getCoords().includes(coord)); // TODO: make this remove max 1 resource

  }

  const mapCoords = () => {

    // plant
    let plantCoords;
    if (plant) {
      plantCoords = plant.getCoords();
    }

    // resources
    let resourcesCoords = {};
    // iterate over resources (sun and water objects)
    for (let i = 0; i < resources.length; i++) {
      const resCoords = resources[i].getCoords(); // array of coords for each resource
      const type = resources[i].getType(); // 'sun' or 'water'
      
      // iterate over coords of single resource
      for (let j = 0; j < resCoords.length; j++) {
        // add to overall resourcesCoords object: 'coord': 'sun' or 'water'
        resourcesCoords[resCoords[j]] = type;
      }
    }

    let map = {};
    for (let i = 0; i < coords.length; i++) {

      // populate coords
      const coord = coords[i];
      map[coord] = {};

      // environment
      map[coord]['environment'] = getAbiotic(coord); // 'soil' or 'air'

      // plant
      if (plantCoords) {
        map[coord]['plant'] = plantCoords[coord]; // 'shoot' or 'root' or 'flower' or ''
        // TODO: get stage of flower
      }

      // resources
      if (resourcesCoords[coord]) {
        map[coord]['resource'] = resourcesCoords[coord] // 'sun' or 'water'
      }
      
    }

    return map;
  }

  const getMap = () => {
    return mapCoords();
  }

  const tick = () => {
    // moves all resources
    for (let i = 0; i < resources.length; i++) {
      resources[i].move();
    }
    if (plant !== null) {
      plant.tick();
    }
  }

  const toString = () => { // for development
    // get map object
    let map = mapCoords();

    const codes = {
      'air':    ' ',
      'soil':   '.',

      'shoot':  's',
      'root':   'r',

      'bud':               '1', // TODO: get Plant.getCoords() to return flower stage instead of just 'flower'
      'flower':            '2',
      'fertilized flower': '3',
      'fruit':             '4',
      'ripe fruit':        '5',
      'dispersed seeds':   '6',

      'sun':    'p',
      'water':  'w',
    }

    // compile and collapse into a string
    let str = '';

    let arr = coords.map(coord => {
      let pixel = map[coord]; // { environment: string, plant: string, [resource: string] }
      let code = '';

      // layering: resource > plant > environment

      // environment
      code = codes[pixel.environment];

      // plant
      if (pixel.plant && pixel.plant !== '') {
        code = codes[pixel.plant];
      }

      // environment
      if (pixel.resource) {
        code = codes[pixel.resource];
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

  const doVerb = (verb) => {
    return plant.doVerb(verb);
    // TODO: refreshes map (?)
    // TODO: refresh readyVerbs
  }

  const getSeeds = () => plant.getSeeds();

  const getPlant = () => plant;

  const getFlowerVerbs = () => {
    if (plant) {
      return plant.getFlowerVerbs();
    } else {
      return false;
    }
  }

  const getCoords = () => coords;

  return {
    createGrid,
    createPlant,
    createSun, createWater,
    getMaxCoord, getMidpoint, getMidline,
    getAbiotic,
    getResources,
    harvestResource,
    tick,
    toString,
    getMap,
    doVerb,
    getSeeds,
    getPlant,
    getFlowerVerbs,
    getCoords,
  }
}

export default Habitat;