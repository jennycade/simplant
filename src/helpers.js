// TODO: Refactor with Grid() as its own module
const createGrid = (width, height) => {
  let grid = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const coord = `${x},${y}`; // x,y
      grid.push(coord);
    }
  }
  return grid; // ['0,0', '0,1', '0,2', ..., 'width,height']
}

const findMidpoint = (coords, type) => {
  // last coord in array = max x, max y
  const [xmax, ymax] = parseCoord(coords[coords.length - 1]);
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

const parseCoord = (coord) => {
  const coords = coord.split(',');
  return coords.map(x => parseInt(x));
}
const unparseCoord = (x, y) => {
  return `${x},${y}`;
}

export {
  createGrid,
  findMidpoint,
  parseCoord, unparseCoord,
};