import { combineReducers } from 'redux';

import { OrderReducer } from './order';
// import { TimelineReducer } from './TimelineReducer';

class StateModel {
  loading: boolean;
  loaded: boolean;
}

const rootReducer = combineReducers({
  order: OrderReducer,
//   timeline: TimelineReducer,
});

export default rootReducer;