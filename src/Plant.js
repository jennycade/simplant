const Plant = () => {
  let coords = {};
  const setCoords = (newCoords) => {
    // takes an array of coord strings, uses that as keys
    // sets coords to be an object with coord keys and 'shoot', 'root', or 'empty'
    for (let i = 0; i < newCoords.length; i++) {
      coords[newCoords[i]] = '';
    }
  }

  const containsShoot = (coord) => {
    return true;
  }
  const containsRoot = (coord) => {
    return true;
  }

  // growth actions
  const growShoots = () => {

  }
  const growRoots = () => {

  }
  const newShoot = () => {

  }
  const newRoot = () => {

  }
  const bloom = () => {}

  return {
    coords,
    setCoords,
    containsShoot,
    containsRoot,
    growShoots, growRoots,
    newShoot, newRoot,
    bloom,
  };
}

export default Plant;