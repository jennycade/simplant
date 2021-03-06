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

  const isLegalxCoord = (newCoords) => {
    let legal = true;
    for (let i = 0; i < newCoords.length; i++) {
      const [x, y] = parseCoord(newCoords[i]);
      if (x < xmin || x > xmax) {
        legal = false;
      }
    }
    return legal;
  }

  const areCoordsLegal = () => {
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = parseCoord(coords[i]);
      if (x < xmin || x > xmax || y < ymin || y > ymax) {
        return false;
      }
    }
    return true;
  }

  const move = () => {
    // set change in position
    let xdiff, ydiff, newCoords;
    const xchoices = [-1, 0, 1]; 
    do {
      if (type === 'sun') {
        // straight down
        xdiff = 0;
        ydiff = 1;
      }
      if (type === 'water') {
        // up and randomly to one side or straight up
        xdiff = xchoices[Math.floor(Math.random() * xchoices.length)];
        ydiff = -1;
      }

      newCoords = [];
      // change coords
      for (let i = 0; i < coords.length; i++ ) {
        let [x, y] = parseCoord(coords[i]);
        const newCoord = unparseCoord(x + xdiff, y + ydiff);
        newCoords.push(newCoord);
      }
    } while (! isLegalxCoord(newCoords) )

    coords = newCoords;
    return newCoords;
  }

  const getCoords = () => coords;
  const getType = () => type;

  return {
    move,
    areCoordsLegal,
    getCoords,
    getType
  }
}

export default Resource;