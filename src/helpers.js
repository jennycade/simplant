const createGrid = (width, height) => {
  let grid = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const coord = `${x},${y}`; // x,y
      grid.push(coord);
    }
  }


  return grid;
}

export { createGrid }