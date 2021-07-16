import { parseCoord, unparseCoord } from "./helpers";

const GrowingTip = (coord, dir) => {

  const grow = () => {
    return getNextCoord();
  }

  const getNextCoord = () => {
    let [x, y] = parseCoord(coord);
    // TODO: put this all in a try block and have Grid catch it
    if (dir.includes('u')) {
      y -= 1;
    }
    if (dir.includes('d')) {
      y += 1
    }
    if (dir.includes('l')) {
      x -= 1;
    }
    if (dir.includes('r')) {
      x += 1;
    }

    coord = unparseCoord(x, y);
    return coord;
  }

  return {
    grow,
  };
}

export default GrowingTip;