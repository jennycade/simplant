
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
  parseCoord, unparseCoord,
};