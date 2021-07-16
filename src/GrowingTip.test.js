import GrowingTip from './GrowingTip';

// isShoot
test(`GrowingTip has function isShoot()`, () => {
  const tip = GrowingTip('0,0', 'u');
  expect(tip).toMatchObject({
    isShoot: expect.any(Function),
  });
});

test(`isShoot() returns true when the tip grows straight up`, () => {
  const tip = GrowingTip('0,0', 'u');
  expect(tip.isShoot()).toBe(true);
});

test(`isShoot() returns true when the tip grows up/left`, () => {
  const tip = GrowingTip('0,0', 'ul');
  expect(tip.isShoot()).toBe(true);
});

test(`isShoot() returns false when the tip grows down/right`, () => {
  const tip = GrowingTip('0,0', 'dr');
  expect(tip.isShoot()).toBe(false);
});

// isRoot
test(`GrowingTip has function isRoot()`, () => {
  const tip = GrowingTip('0,0', 'u');
  expect(tip).toMatchObject({
    isRoot: expect.any(Function),
  });
});

test(`isRoot() returns true when the tip grows straight down`, () => {
  const tip = GrowingTip('0,0', 'd');
  expect(tip.isRoot()).toBe(true);
});

test(`isRoot() returns true when the tip grows down/left`, () => {
  const tip = GrowingTip('0,0', 'dl');
  expect(tip.isRoot()).toBe(true);
});

test(`isRoot() returns false when the tip grows up/right`, () => {
  const tip = GrowingTip('0,0', 'ur');
  expect(tip.isRoot()).toBe(false);
});

// grow()
test(`GrowingTip has function grow()`, () => {
  const tip = GrowingTip('0,0', 'u');
  expect(tip).toMatchObject({
    grow: expect.any(Function),
  });
});

test(`grow() returns a string`, () => {
  const tip = GrowingTip('2,2', 'u');
  const newCoord = tip.grow();
  expect(newCoord).toEqual(expect.any(String));
});

//   0 1 2 3 4
// 0 - - - - -
// 1 - - - - -
// 2 - - s - -
// 3 - - - - -
// 4 - - - - -

test(`grow() returns correct coord (moving from previous coord in direction): straight up`, () => {
  const tip = GrowingTip('2,2', 'u');
  const newCoord = tip.grow();
  expect(newCoord).toBe('2,1');
});
test(`grow() returns correct coord (moving from previous coord in direction): straight down`, () => {
  const tip = GrowingTip('2,2', 'd');
  const newCoord = tip.grow();
  expect(newCoord).toBe('2,3');
});
test(`grow() returns correct coord (moving from previous coord in direction): up/left`, () => {
  const tip = GrowingTip('2,2', 'ul');
  const newCoord = tip.grow();
  expect(newCoord).toBe('1,1');
});
test(`grow() returns correct coord (moving from previous coord in direction): up/right`, () => {
  const tip = GrowingTip('2,2', 'ur');
  const newCoord = tip.grow();
  expect(newCoord).toBe('3,1');
});
test(`grow() returns correct coord (moving from previous coord in direction): down/left`, () => {
  const tip = GrowingTip('2,2', 'dl');
  const newCoord = tip.grow();
  expect(newCoord).toBe('1,3');
});
test(`grow() returns correct coord (moving from previous coord in direction): down right`, () => {
  const tip = GrowingTip('2,2', 'dr');
  const newCoord = tip.grow();
  expect(newCoord).toBe('3,3');
});

test(`grow() grows in the correct direction twice in a row: straight up`, () => {
  const tip = GrowingTip('2,2', 'u');
  const firstCoord = tip.grow();
  const secondCoord = tip.grow();

  expect(firstCoord).toBe('2,1');
  expect(secondCoord).toBe('2,0');
});


// TODO: grow() handles edges of the board by ceasing to grow