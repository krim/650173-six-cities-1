import getRating from './get-rating';

describe(`getRating`, () => {
  it(`returns corrent result`, () => {
    expect(getRating(4.5)).toBe(`90%`);
  });
});
