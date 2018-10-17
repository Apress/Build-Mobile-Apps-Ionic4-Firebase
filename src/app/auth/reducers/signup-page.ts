import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Signup: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case AuthActionTypes.SignupSuccess: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }

    case AuthActionTypes.SignupFailure: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
