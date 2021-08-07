import Game from './Game';

test(`Game has function init()`, () => {
  const game = Game();
  expect(game).toMatchObject({
    init: expect.any(Function),
  });
});

test(`Once a game is initiated, a user can grow the plant's shoot`, () => {
  const game = Game();

  game.init(10, 10);

  const result = game.doVerb('growShoots');

  expect(result).toBe(true);
});

/////////// verbs
test(`Game can do all the verbs (excluding flowers)`, () => {
  const game = Game();
  game.init(10, 10);

  let results = [];

  const verbs = ['growShoots', 'growRoots', 'newShoot', 'newRoot', 'bloom'];

  for (let i = 0; i < verbs.length; i++) {
    const verb = verbs[i];
    results.push(game.doVerb(verb));
  }

  const expectedResults = [true, true, true, true, expect.any(Object)];

  expect(results).toEqual(expectedResults);
});

// getReadyVerbs
test(`After 5 ticks, getReadyVerbs includes 'blossom'`, () => {
  const game = Game();
  game.init(10, 10);
  game.doVerb('bloom');

  // tick
  for (let i = 0; i < 5; i++) {
    game.tick();
  }

  const verbs = game.getReadyVerbs();

  expect(verbs).toContainEqual({verb: 'blossom', cost: 20, area: 'flower'});
});

test(`After 5 ticks, a flower can blossom`, () => {
  const game = Game();
  game.init(10, 10);
  game.doVerb('bloom');

  // tick
  for (let i = 0; i < 5; i++) {
    game.tick();
  }

  const result = game.doVerb('blossom');

  expect(result).toBe(true);
});

/////////////// more things Game has to do
// keep track of time

// randomly send out resources

// check to make sure energy is sufficient before carrying out doVerb()

// deduct energy when carrying out doVerb()

// if doVerb() returns false, refund the energy and (maybe) display a message about why it failed