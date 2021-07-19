const Flower = () => {

  const stages = {
    'bud': {
      nextVerb: 'blossom',
      minTime: 5,
    },
    'flower': {
      nextVerb: 'fertilize',
      minTime: 5,
    },
    'fertilized flower': {
      nextVerb: 'fruit',
      minTime: 5,
    },
    'fruit': {
      nextVerb: 'ripen',
      minTime: 5,
    },
    'ripe fruit': {
      nextVerb: 'disperse',
      minTime: 5
    },
    'dispersed seeds': {
      nextVerb: '',
      minTime: 5,
    },
  };

  let time = 0;

  let stage = Object.keys(stages)[0];

  const getStage = () => { return stage; }

  const getNextVerb = () => {
    return stages[stage].nextVerb;
  }

  const incTime = () => {
    time ++;
  }

  const doVerb = (verb) => {
    // only do it if stage and time are right
  }

  return {
    getStage,
    getNextVerb,
    incTime,
    doVerb,
  };
}

export default Flower;