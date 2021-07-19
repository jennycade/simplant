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