import Game from './Game';

test(`Game has function init()`, () => {
  const game = Game();
  expect(game).toMatchObject({
    init: expect.any(Function),
  });
});