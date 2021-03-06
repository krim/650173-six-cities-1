import {ActionType, Operation, reducer} from './data';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';
import city from '../../__fixtures__/city';
import camelcaseKeys from 'camelcase-keys';

describe(`Operation.setApartment`, () => {
  it(`sets apartments`, () => {
    const dispatch = jest.fn();
    Operation.setApartment(apartment)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.SET_APARTMENT,
      payload: apartment
    });
  });
});

describe(`Operation.switchCity`, () => {
  it(`switches the city to the new one`, () => {
    const dispatch = jest.fn();
    Operation.switchCity({name: `Amsterdam`})(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.SWITCH_CITY,
      payload: {name: `Amsterdam`}
    });
  });
});

describe(`Operation.switchSort`, () => {
  it(`switches the sort to the new one`, () => {
    const dispatch = jest.fn();
    Operation.switchSort(`test`)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.SWITCH_SORT,
      payload: `test`
    });
  });
});

describe(`Operation.loadApartments`, () => {
  it(`loads apartments`, () => {
    const apartments = [apartment];
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const apartmentsLoader = Operation.loadApartments();

    apiMock
      .onGet(`/hotels`)
      .reply(200, JSON.stringify(apartments));

    apartmentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_APARTMENTS,
          payload: apartments
        });
      });
  });
});

describe(`Operation.postReview`, () => {
  it(`posts review for apartment`, () => {
    const reviews = [{...review, date: `2019-05-21T05:25:32.222Z`}];
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewData = {rating: review.rating, comment: review.comment};
    const postReview = Operation.postReview(reviewData, apartment.id);

    apiMock
      .onPost(`/comments/${apartment.id}`, reviewData)
      .reply(200, JSON.stringify(reviews));

    postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: [review]
        });
      });
  });
});

describe(`Operation.loadReviews`, () => {
  it(`loads reviews`, () => {
    const reviews = [{...review, date: `2019-05-21T05:25:32.222Z`}];
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const apartmentsLoader = Operation.loadReviews(apartment.id);

    apiMock
      .onGet(`/comments/${apartment.id}`)
      .reply(200, JSON.stringify(reviews));

    apartmentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [review]
        });
      });
  });
});

describe(`Operation.addToFavorites`, () => {
  it(`adds an apartment to favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const addToFavorites = Operation.addToFavorites(apartment.id);

    apiMock
      .onPost(`/favorite/${apartment.id}/1`)
      .reply(200, JSON.stringify(apartment));

    addToFavorites(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_TO_FAVORITES,
          payload: camelcaseKeys(apartment),
        });
      }).
      catch((_error) => {});
  });
});

describe(`Operation.removeFromFavorites`, () => {
  it(`removes an apartment from favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const removeFromFavorites = Operation.removeFromFavorites(apartment.id);

    apiMock
      .onPost(`/favorite/${apartment.id}/0`)
      .reply(200, JSON.stringify(apartment));

    removeFromFavorites(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REMOVE_FROM_FAVORITES,
          payload: camelcaseKeys(apartment),
        });
      }).
      catch((_error) => {});
  });
});

describe(`Operation.loadFavorites`, () => {
  it(`loads favorites`, () => {
    const favorites = [apartment];
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, JSON.stringify(favorites));

    favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: favorites
        });
      });
  });
});

describe(`Reducer`, () => {
  describe(`default`, () => {
    it(`changes the state`, () => {
      expect(reducer(undefined, {})).toEqual({
        apartments: [],
        apartment: {},
        favorites: [],
        city: {},
        reviews: [],
        activeSort: `Popular`,
        error: null
      });
    });
  });

  describe(`SWITCH_CITY`, () => {
    it(`changes the state`, () => {
      expect(
          reducer(
              {city: {}},
              {type: ActionType.SWITCH_CITY, payload: city}
          )
      ).toEqual({city});
    });
  });

  describe(`SWITCH_SORT`, () => {
    it(`changes the state`, () => {
      const sort = `sort`;
      expect(
          reducer(
              {activeSort: `Popular`},
              {type: ActionType.SWITCH_SORT, payload: sort}
          )
      ).toEqual({activeSort: sort});
    });
  });

  describe(`LOAD_APARTMENTS`, () => {
    it(`changes the state`, () => {
      const apartments = [apartment];
      expect(
          reducer(
              {apartments: []},
              {type: ActionType.LOAD_APARTMENTS, payload: apartments}
          )
      ).toEqual({apartments});
    });
  });

  describe(`LOAD_REVIEWS`, () => {
    it(`changes the state`, () => {
      const reviews = [review];
      expect(
          reducer(
              {reviews: []},
              {type: ActionType.LOAD_REVIEWS, payload: reviews}
          )
      ).toEqual({reviews});
    });
  });

  describe(`POST_REVIEW`, () => {
    it(`changes the state`, () => {
      const reviews = [review];
      expect(
          reducer(
              {reviews: []},
              {type: ActionType.POST_REVIEW, payload: reviews}
          )
      ).toEqual({reviews});
    });
  });

  describe(`SET_APARTMENT`, () => {
    it(`changes the state`, () => {
      expect(
          reducer(
              {apartment: []},
              {type: ActionType.SET_APARTMENT, payload: apartment}
          )
      ).toEqual({apartment});
    });
  });

  describe(`SET_ERROR`, () => {
    it(`changes the state`, () => {
      const error = `error`;
      expect(
          reducer(
              {error: ``},
              {type: ActionType.SET_ERROR, payload: error}
          )
      ).toEqual({error});
    });
  });

  describe(`LOAD_FAVORITES`, () => {
    it(`changes the state`, () => {
      const favorites = [apartment];
      expect(
          reducer(
              {favorites: []},
              {type: ActionType.LOAD_FAVORITES, payload: favorites}
          )
      ).toEqual({favorites});
    });
  });

  describe(`ADD_TO_FAVORITES`, () => {
    it(`changes the state`, () => {
      const favorites = [apartment];
      const favoriteApartment = {...apartment, isFavorite: true};
      expect(
          reducer(
              {apartments: favorites},
              {type: ActionType.ADD_TO_FAVORITES, payload: favoriteApartment}
          )
      ).toEqual({apartments: [favoriteApartment]});
    });
  });

  describe(`REMOVE_FROM_FAVORITES`, () => {
    it(`changes the state`, () => {
      const apartments = [apartment];
      expect(
          reducer(
              {favorites: [apartment], apartments},
              {type: ActionType.REMOVE_FROM_FAVORITES, payload: apartment}
          )
      ).toEqual({favorites: [], apartments});
    });
  });
});
