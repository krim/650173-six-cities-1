import getRating from './get-rating';

describe(`getRating`, () => {
  it(`returns corrent result`, () => {
    expect(getRating(4.5)).toBe(`100%`);
    expect(getRating(4.4)).toBe(`80%`);
  });
});
