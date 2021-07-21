

const findMidpoint = (coords, type) => { // TODO: refactor as Habitat.getMidpoint()
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

const findMidline = (coords) => { // TODO: refactor as Habitat.findMidline
  const [xmax, ymax] = findMaxCoord(coords);
  return Math.floor(xmax / 2);
}

const parseCoord = (coord) => { // TODO: Write some error-catching here. If plant.sprout() is called before plant.setCoords(), this function is called with coord = undefined.
  if (coord === undefined) {
    throw(new Error(`Called parseCoord(undefined)`));
  }
  const coords = coord.split(',');
  return coords.map(x => parseInt(x));
}
const unparseCoord = (x, y) => {
  return `${x},${y}`;
}

export {
  findMidpoint, findMidline,
  parseCoord, unparseCoord,
};