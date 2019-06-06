import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.FAVORITE;

export const getFavorites = (state) => {
  const favorites = state[NAME_SPACE].favorites;
  return favorites;
};
