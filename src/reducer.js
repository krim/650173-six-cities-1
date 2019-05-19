import apartments from './mocks/apartments';

const initialState = {
  town: {},
  apartments: []
};

const ActionCreator = {
  switchTown: (town) => ({
    type: `SWITH_TOWN`,
    payload: town
  }),
  getApartments: () => {
    // fetch apartments via API will be here
    return {
      type: `GET_APARTMENTS`,
      payload: apartments
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SWITCH_TOWN`: return Object.assign({}, state, {
      town: action.payload
    });

    case `GET_APARTMENTS`: return Object.assign({}, state, {
      apartments: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  reducer
};
