import { parseCoord, unparseCoord } from "./helpers";

const GrowingTip = (coord, dir) => {

  const origin = coord;

  const getOrigin = () => {
    return origin;
  }

  const isShoot = () => {
    return dir.includes('u');
  }

  const isRoot = () => {
    return dir.includes('d');
  }

  const grow = () => {
    return getNextCoord();
  }

  const getNextCoord = () => {
    let [x, y] = parseCoord(coord);
    // TODO: put this all in a try block and have Grid catch it
    if (isShoot()) {
      y -= 1;
    }
    if (isRoot()) {
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
    getOrigin,
    isShoot, isRoot,
    grow,
  };
}

export default GrowingTip;