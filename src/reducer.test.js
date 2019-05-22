import {
  ActionCreator,
  ActionType,
  reducer
} from "./reducer";
import apartment from './__fixtures__/apartment';

const apartments = [apartment];

const Apartments = {
  load: () => apartments
};

describe(`ActionCreator`, () => {
  describe(`switchTown`, () => {
    it(`switches the town to the new one`, () => {
      expect(ActionCreator.switchTown({title: `Amsterdam`})).toEqual({
        type: ActionType.SWITCH_TOWN,
        payload: {title: `Amsterdam`}
      });
    });
  });

  describe(`loadApartments`, () => {
    it(`loads apartments`, () => {
      expect(ActionCreator.loadApartments(Apartments)).toEqual({
        type: ActionType.LOAD_APARTMENTS,
        payload: apartments
      });
    });
  });
});
