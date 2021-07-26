import { parseCoord, unparseCoord } from './helpers';

const Resource = (type, legalCoords) => {
  let coords = [];

  // set min and max x and y coordinates
  const minCoord = legalCoords[0];
  const maxCoord = legalCoords[legalCoords.length - 1];

  const [xmin, ymin] = parseCoord(minCoord);
  const [xmax, ymax] = parseCoord(maxCoord);
  
  // randomly pick a starting coord
  const x = Math.floor(Math.random() * (xmax + 1));
  const y = type === 'sun' ? 0 : ymax;

  coords.push(unparseCoord(x, y));


  const move = () => {}
  const getCoords = () => {
    return coords;
  }

  return {
    move,
    getCoords,
  }
}

export default Resource;