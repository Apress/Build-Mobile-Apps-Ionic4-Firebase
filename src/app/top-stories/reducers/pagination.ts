import { TopStoriesActions, TopStoriesActionTypes } from '../actions/top-stories';

export interface State {
  offset: number;
  limit: number;
  total: number;
}

export const pageSize = 20;

const initialState: State = {
  offset: 0,
  limit: pageSize,
  total: 0,
};

export function reducer(
  state = initialState,
  action: TopStoriesActions,
): State {
  switch (action.type) {
    case TopStoriesActionTypes.Refresh:
      return {
        ...state,
        offset: 0,
        limit: pageSize,
      };
    case TopStoriesActionTypes.LoadMore:
      const offset = state.offset + state.limit;
      return {
        ...state,
        offset: offset < state.total ? offset : state.offset,
      };
    case TopStoriesActionTypes.LoadSuccess:
      return {
        ...state,
        total: action.payload.length,
      };
    default: {
      return state;
    }
  }
}
