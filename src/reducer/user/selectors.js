import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const getUser = (state) => state[NAME_SPACE].user;
