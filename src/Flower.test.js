import Flower from './Flower';

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

//////////// incTime()
test(`Flower has function incTime()`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    incTime: expect.any(Function),
  });
});

//////////// getStage()
test(`Flower has function getStage`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    getStage: expect.any(Function),
  });
});

test(`The stage of a new flower is 'bud'`, () => {
  const flower = Flower();
  const stage = flower.getStage();

  expect(stage).toBe('bud');
});

///////////// getNextVerb()
test(`Flower has function getNextVerb()`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    getNextVerb: expect.any(Function),
  });
});

test(`The next verb for a new flower is 'blossom'`, () => {
  const flower = Flower();
  const nextVerb = flower.getNextVerb();

  expect(nextVerb).toBe('blossom');
});

///////////// isVerbReady()
test(`isVerbReady() returns false for a brand new flower`, () => {
  const flower = Flower();
  const ready = flower.isVerbReady();

  expect(ready).toBe(false);
});

///////////// doVerb()
test(`Flower has function doVerb(verb)`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    doVerb: expect.any(Function),
  });
});

test(`A flower bud at time 5 can blossom`, () => {
  const flower = Flower();
  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('blossom');

  const stage = flower.getStage();

  expect(stage).toBe('flower');
});

test(`A flower bud at time 50 can blossom`, () => {
  const flower = Flower();
  for (let i=0; i<50; i++) {
    flower.incTime();
  }
  flower.doVerb('blossom');

  const stage = flower.getStage();

  expect(stage).toBe('flower');
});

test(`A flower bud at time 5 can blossom and then fertilize at time 5`, () => {
  const flower = Flower();
  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('blossom');

  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('fertilize');

  const stage = flower.getStage();

  expect(stage).toBe('fertilized flower');
});

test(`A flower bud at time 4 cannot blossom`, () => {
  const flower = Flower();
  for (let i=0; i<4; i++) {
    flower.incTime();
  }
  flower.doVerb('blossom');

  const stage = flower.getStage();

  expect(stage).toBe('bud');
});

test(`A flower bud at time 5 can blossom and then cannot fertilize at time 4`, () => {
  const flower = Flower();
  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('blossom');

  for (let i=0; i<4; i++) {
    flower.incTime();
  }
  flower.doVerb('fertilize');

  const stage = flower.getStage();

  expect(stage).toBe('flower');
});

test(`A flower bud at time 5 cannot fertilize`, () => {
  const flower = Flower();
  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('fertilize');

  const stage = flower.getStage();

  expect(stage).toBe('bud');
});

//////////// seed dispersal
test(`When stage goes to 'dispersed seeds', getSeeds() returns a positive integer`, () => {
  const flower = Flower();

  for (const [stage, val] of Object.entries(stages)) {
    // run the clock
    for (let i=0; i<val.minTime; i++) {
      flower.incTime();
    }
    // do verb
    flower.doVerb(val.nextVerb);
  }

  const seeds = flower.getSeeds();

  const seedsIsPos = seeds > 0;
  const seedsIsInt = Number.isInteger(seeds);

  expect(seedsIsPos).toBe(true);
  expect(seedsIsInt).toBe(true);
});

test(`Before seed dispersal, getSeeds() returns 0`, () => {
  const flower = Flower();

  for (const [stage, val] of Object.entries(stages)) {
    // run the clock
    for (let i=0; i<val.minTime; i++) {
      flower.incTime();
    }
    // do verb
    if (stage !== 'ripe fruit') {
      flower.doVerb(val.nextVerb);
    }
  }

  const seeds = flower.getSeeds();

  expect(seeds).toBe(0);
});