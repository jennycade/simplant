import Game from './Game';

test(`Game has function init()`, () => {
  const game = Game();
  expect(game).toMatchObject({
    init: expect.any(Function),
  });
});

test(`Once a game is initiated, a user can grow the plant's shoot`, () => {
  const game = Game();

  game.init();

  const result = game.doVerb('growShoots');

  expect(result).toBe(true);
});

/////////// verbs
// test(``)