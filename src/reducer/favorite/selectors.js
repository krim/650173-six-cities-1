import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.FAVORITE;

export const getFavorites = (state) => state[NAME_SPACE].favorites;
