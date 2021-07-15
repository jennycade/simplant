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

export { createGrid }