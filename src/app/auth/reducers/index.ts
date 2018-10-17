import { ActionReducerMap, createFeatureSelector, createSelector, } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';
import * as fromSignupPage from './signup-page';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  signupPage: fromSignupPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  signupPage: fromSignupPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPageLoading = createSelector(
  selectLoginPageState,
  fromLoginPage.getLoading
);

export const getSignupPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signupPage
);

export const getSignupPageLoading = createSelector(
  getSignupPageState,
  fromSignupPage.getLoading
);

export const getSignupPageError = createSelector(
  getSignupPageState,
  fromSignupPage.getError
);
