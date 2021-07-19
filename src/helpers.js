// TODO: Refactor with Grid() as its own module
const createGrid = (width, height) => {
  let grid = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const coord = `${x},${y}`; // x,y
      grid.push(coord);
    }
  }
  return grid; // ['0,0', '1,0', '2,0', ..., 'width,height']
}

const findMaxCoord = (coords) => {
  return parseCoord(coords[coords.length - 1]);
}

const findMidpoint = (coords, type) => {
  // last coord in array = max x, max y
  const [xmax, ymax] = findMaxCoord(coords);
  // console.log(`Dimensions: ${xmax}, ${ymax}`);

  // find mid x coord
  const xmid = Math.floor(xmax / 2);

  // find mid y coord
  let ymid = Math.floor(ymax / 2);
  if (type === 'root') {
    ymid ++;
  }

  return unparseCoord(xmid, ymid);
  
}

const findMidline = (coords) => {
  const [xmax, ymax] = findMaxCoord(coords);
  return Math.floor(xmax / 2);
}

const parseCoord = (coord) => { // TODO: Write some error-catching here. If plant.sprout() is called before plant.setCoords(), this function is called with coord = undefined.
  const coords = coord.split(',');
  return coords.map(x => parseInt(x));
}
const unparseCoord = (x, y) => {
  return `${x},${y}`;
}

export {
  createGrid,
  findMidpoint, findMidline,
  parseCoord, unparseCoord,
};