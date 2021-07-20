import Flower from './Flower';

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

test(`A flower bud at time 5 cannot fertilize`, () => {
  const flower = Flower();
  for (let i=0; i<5; i++) {
    flower.incTime();
  }
  flower.doVerb('fertilize');

  const stage = flower.getStage();

  expect(stage).toBe('bud');
});