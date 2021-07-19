import Flower from './Flower';

//////////// setTime() ----- for dev only?
test(`Flower has function setTime()`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    setTime: expect.any(Function),
  });
});

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

///////////// verb()
test(`Flower has function doVerb(verb)`, () => {
  const flower = Flower();
  expect(flower).toMatchObject({
    doVerb: expect.any(Function),
  });
});