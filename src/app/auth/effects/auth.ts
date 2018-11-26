import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService, LoginProvider } from '../services/auth.service';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  LoginWithProvider,
  LogoutFailure,
  LogoutSuccess,
  Signup,
  SignupFailure,
  SignupSuccess
} from '../actions/auth';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EmailPasswordPair, NewAccount } from '../../models/user';
import { from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as favoritesActions from '../../favorites/actions/favorites';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

  @Effect()
  login$ = this.action$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    mergeMap((pair: EmailPasswordPair) =>
      from(this.authService.login(pair))
        .pipe(
          mergeMap(user => of<Action>(new LoginSuccess(user), new favoritesActions.Load())),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );

  @Effect()
  loginWithProvider$ = this.action$.pipe(
    ofType(AuthActionTypes.LoginWithProvider),
    map((action: LoginWithProvider) => action.payload),
    mergeMap((provider: LoginProvider) =>
      from(this.authService.logInWithProvider(provider))
        .pipe(
          mergeMap(user => of<Action>(new LoginSuccess(user), new favoritesActions.Load())),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );

  @Effect()
  signup$ = this.action$.pipe(
    ofType(AuthActionTypes.Signup),
    map((action: Signup) => action.payload),
    mergeMap((user: NewAccount) =>
      from(this.authService.create(user))
        .pipe(
          mergeMap(createdUser => of<Action>(new SignupSuccess(), new LoginSuccess(createdUser), new favoritesActions.Load())),
          catchError(error => of(new SignupFailure(error)))
        )
    )
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.action$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({dispatch: false})
  logoutSuccess$ = this.action$.pipe(
    ofType(AuthActionTypes.LogoutSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.action$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  logout$ = this.action$.pipe(
    ofType(AuthActionTypes.Logout),
    mergeMap(() =>
      from(this.authService.logout())
        .pipe(
          mergeMap(user => of<Action>(new LogoutSuccess(), new favoritesActions.Clear())),
          catchError(error => of(new LogoutFailure(error)))
        )
    )
  );
}
