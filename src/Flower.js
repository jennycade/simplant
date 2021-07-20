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
  const stagesArr = Object.keys(stages);

  let time = 0;

  let stage = Object.keys(stages)[0];

  const getStage = () => { return stage; }

  const getNextVerb = () => {
    // for displaying the user action button
    return stages[stage].nextVerb;
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
    // check stage; stages[stage]['nextVerb'] === verb
    // check time; stages[stage]['minTime'] <= time
    if (stages[stage]['nextVerb'] === verb && stages[stage]['minTime'] <= time) {
      // do it
      incStage();
    }
  }

  return {
    getStage,
    getNextVerb,
    incTime,
    doVerb,
  };
}

export default Flower;