import apartments from './mocks/apartments';

const initialState = {
  town: {},
  apartments: [],
  townApartments: []
};

const ActionType = {
  SWITCH_TOWN: `SWITCH_TOWN`,
  LOAD_APARTMENTS: `LOAD_APARTMENTS`
};

const Apartments = {
  load: () => apartments
};

const ActionCreator = {
  switchTown: (town) => ({
    type: ActionType.SWITCH_TOWN,
    payload: town
  }),
  fetchApartments: (loader = Apartments) => {
    // fetch apartments via API will be here
    return {
      type: ActionType.LOAD_APARTMENTS,
      payload: loader.load()
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SWITCH_TOWN`: return Object.assign({}, state, {
      town: action.payload
    });

    case `LOAD_APARTMENTS`: return Object.assign({}, state, {
      apartments: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  initialState,
  reducer
};
