const Plant = () => {
  let coords;
  const setCoords = (coords) => {
    // takes an array of coord keys
    // sets coords to be an object with coord keys and 'shoot', 'root', or 'empty'
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
    setCoords,
    containsShoot,
    containsRoot,
    growShoots, growRoots,
    newShoot, newRoot,
    bloom,
  };
}

export default Plant;