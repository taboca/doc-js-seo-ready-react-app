import { REQUEST_ARTICLES } from './actions';

const defaultState = {
  sections: [],
}

export default function reduce(state = defaultState, action = {}) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        sections     : action.sections,
      });
    default:
      return state;
  }
}
