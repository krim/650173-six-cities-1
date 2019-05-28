import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.DATA]: data
});
