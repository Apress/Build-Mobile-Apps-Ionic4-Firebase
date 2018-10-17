import { User } from '../../models/user';
import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
  loggedIn: boolean;
  user: User | null;
  logoutError: any;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  logoutError: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        logoutError: null,
      };
    }

    case AuthActionTypes.LogoutSuccess: {
      return initialState;
    }

    case AuthActionTypes.LogoutFailure: {
      return {
        ...state,
        logoutError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
