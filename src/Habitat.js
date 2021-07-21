import Plant from './Plant';

const Habitat = () => {
  let coords = [];
  let maxCoord = '';
  let plant = null;

  const createGrid = (width, height) => {
    coords = [];
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const coord = `${x},${y}`; // x,y
        coords.push(coord);
      }
    }
    maxCoord = `${width - 1},${height - 1}`;

    return coords; // ['0,0', '1,0', '2,0', ..., 'width,height']
  }

  const createPlant = () => {
    plant = Plant();

    // setCoords
    plant.setCoords(coords);

    return plant;
  }

  const getMaxCoord = () => maxCoord;

  return {
    createGrid,
    createPlant,
    getMaxCoord,
  }
}

export default Habitat;