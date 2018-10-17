import { TopStoriesActions, TopStoriesActionTypes } from '../actions/top-stories';

export interface State {
  ids: number[];
  loading: boolean;
  error: any;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: TopStoriesActions,
): State {
  switch (action.type) {
    case TopStoriesActionTypes.Refresh:
      return {
        ...state,
        loading: true,
      };
    case TopStoriesActionTypes.LoadSuccess:
      return {
        loading: false,
        ids: action.payload,
        error: null,
      };
    case TopStoriesActionTypes.LoadFail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
