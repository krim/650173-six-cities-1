import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as user} from './user/user';
import {reducer as favorite} from './favorite/favorite';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITE]: favorite
});
