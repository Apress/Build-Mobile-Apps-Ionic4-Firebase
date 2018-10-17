import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';
import { combineLatest, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { ItemActionTypes, Load, LoadFail, LoadSuccess } from '../actions/items';
import { Item } from '../models/item';
import { HACKER_NEWS_DB } from '../hackernews-db';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {}

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(ItemActionTypes.Load),
    map((action: Load) => action.payload),
    mergeMap((ids: number[]) =>
      combineLatest(
        ids.map(id => this.db.object('/v0/item/' + id).valueChanges().pipe(take(1)))
      ).pipe(
        map((items: Item[]) => new LoadSuccess(items)),
        catchError(error => of(new LoadFail(error))),
    ))
  );
}
