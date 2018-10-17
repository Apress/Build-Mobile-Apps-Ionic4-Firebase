import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FavoritesService } from '../services/favorites.service';
import { Add, AddFailure, AddSuccess, FavoritesActionTypes, LoadSuccess, Remove, RemoveFailure, RemoveSuccess } from '../actions/favorites';
import * as itemsActions from '../../actions/items';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';

@Injectable()
export class FavoritesEffects {
  constructor(private action$: Actions,
              private store: Store<fromAuth.State>,
              private favoritesService: FavoritesService) {
  }

  @Effect()
  load$ = this.action$.pipe(
    ofType(FavoritesActionTypes.Load),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => {
      const {auth: {status: {user}}} = state;
      return from(this.favoritesService.list(user.uid)).pipe(
        mergeMap(favorites => of<Action>(
          new LoadSuccess(favorites),
          new itemsActions.Load(favorites.map(f => f.itemId))
        ))
      );
    })
  );

  @Effect()
  add$ = this.action$.pipe(
    ofType(FavoritesActionTypes.Add),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => {
      const {auth: {status: {user}}} = state;
      const itemId = (action as Add).payload;
      return from(this.favoritesService.add(user.uid, itemId)).pipe(
        map(result => new AddSuccess(result)),
        catchError((error) => of(new AddFailure(itemId)))
      );
    })
  );

  @Effect()
  remove$ = this.action$.pipe(
    ofType(FavoritesActionTypes.Remove),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => {
      const {auth: {status: {user}}} = state;
      const itemId = (action as Remove).payload;
      return from(this.favoritesService.remove(user.uid, itemId)).pipe(
        map(() => new RemoveSuccess(itemId)),
        catchError((error) => of(new RemoveFailure(itemId)))
      );
    })
  );
}
