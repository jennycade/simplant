const Flower = (coord) => {

  const stages = {
    'bud': {
      nextVerb: 'blossom',
      minTime: 5,
      nextStage: 'flower',
    },
    'flower': {
      nextVerb: 'fertilize',
      minTime: 5,
      nextStage: 'fertilized flower',
    },
    'fertilized flower': {
      nextVerb: 'fruit',
      minTime: 5,
      nextStage: 'fruit',
    },
    'fruit': {
      nextVerb: 'ripen',
      minTime: 5,
      nextStage: 'ripe fruit',
    },
    'ripe fruit': {
      nextVerb: 'disperse',
      minTime: 5,
      nextStage: 'dispersed seeds',
    },
    'dispersed seeds': {
      nextVerb: null,
      minTime: 5,
      nextStage: null,
    },
  };

  let time = 0;

  let stage = Object.keys(stages)[0];

  let seeds = 0;

  const getCoord = () => coord;

  const getStage = () => { return stage; }

  const getSeeds = () => { return seeds }

  const getNextVerb = () => {
    // for displaying the user action button
    return stages[stage].nextVerb;
  }

  const isVerbReady = () => {
    // true if time >= minTime
    const minTime = stages[stage].minTime;

    return ( time >= minTime );
  }

  const incTime = () => {
    time ++;
  }

  const incStage = () => {
    // set stage
    stage = stages[stage].nextStage;

    // reset time
    time = 0;
  }

  const doVerb = (verb) => {
    // only do it if stage and time are right
    if (getNextVerb() === verb && isVerbReady()) {
      // do it
      incStage();
    } // TODO: Throw an error as an else clause (and update tests)

    if (stage === 'dispersed seeds') { // TODO: Don't hardcode in this value; check to see if it's the last stage instead
      // disperse some seeds!
      seeds = 100; // TODO: Randomly generate the number of seeds
    }
  }

  return {
    getCoord,
    getStage, getSeeds,
    getNextVerb, isVerbReady,
    incTime,
    doVerb,
  };
}

export default Flower;