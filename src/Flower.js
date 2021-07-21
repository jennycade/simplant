const Flower = () => {

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
      nextVerb: '',
      minTime: 5,
      nextStage: '',
    },
  };

  let time = 0;

  let stage = Object.keys(stages)[0];

  let seeds = 0;

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
    }

    if (stage === 'dispersed seeds') { // TODO: Don't hardcode in this value; check to see if it's the last stage instead
      // disperse some seeds!
      seeds = 100; // TODO: Randomly generate the number of seeds
    }
  }

  return {
    getStage, getSeeds,
    getNextVerb, isVerbReady,
    incTime,
    doVerb,
  };
}

export default Flower;