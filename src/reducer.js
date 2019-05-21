import apartments from './mocks/apartments';

const initialState = {
  town: {},
  apartments: [],
  townApartments: []
};

const ActionCreator = {
  switchTown: (town) => ({
    type: `SWITCH_TOWN`,
    payload: town
  }),
  loadApartments: () => {
    // fetch apartments via API will be here
    return {
      type: `LOAD_APARTMENTS`,
      payload: apartments
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
  reducer
};
