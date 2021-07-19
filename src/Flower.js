const Flower = () => {

  const stages = {
    bud: {nextVerb: '', minTime: 0,},
    flower: {nextVerb: '', minTime: 0,},
    fertilized: {nextVerb: '', minTime: 0,},
    fruit: {nextVerb: '', minTime: 0,},
    dispersed: {nextVerb: '', minTime: 0,},
  };

  let time = 0;

  let stage = Object.keys(stages)[0];

  const getStage = () => { return stage; }

  const setTime = (newTime) => {}

  const incTime = () => {
    time ++;
  }

  const doVerb = (verb) => {
    // only do it if stage and time are right
  }

  return {
    getStage,
    setTime, incTime,
    doVerb,
  };
}

export default Flower;