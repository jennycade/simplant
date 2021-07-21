import Sunlight from './Sunlight';

test(`Sunlight has function move()`, () => {
  const sun = Sunlight();
  expect(sun).toMatchObject({
    move: expect.any(Function),
  });
});
