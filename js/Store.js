import { LOAD_CATEGORIES, LOAD_TAGS, GET_TAB_INFO } from './Actions';

export default function counter(state = 0, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      console.debug(state, action);
      return state;
    case LOAD_TAGS:
      console.debug(state, action);
      return state;
    case GET_TAB_INFO:
      console.debug(state, action);
      return state;
    default:
      return state;
  }
}
