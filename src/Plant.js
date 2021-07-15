const Plant = () => {
  let coords = {};
  const setCoords = (newCoords) => {
    // takes an array of coord strings, uses that as keys
    // sets coords to be an object with coord keys and 'shoot', 'root', or 'empty'
    for (let i = 0; i < newCoords.length; i++) {
      coords[newCoords[i]] = '';
    }
  }

  // contains functions
  const containsShoot = (coord) => {
    return true;
  }
  const containsRoot = (coord) => {
    return true;
  }

  // sprout!
  // make two growing tips: one shoot and one root
  // two pixels at the middle of the grid
  const sprout = () => {
    coords['0,0'] = 'shoot';
    coords['1,1'] = 'root';
  }

  // user growth actions
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
    sprout,
    containsShoot,
    containsRoot,
    growShoots, growRoots,
    newShoot, newRoot,
    bloom,
  };
}

export default Plant;