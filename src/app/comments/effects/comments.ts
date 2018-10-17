import { Inject, Injectable } from '@angular/core';
import * as fromComments from '../reducers';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import * as commentsActions from '../actions/comments';
import { CommentsActionTypes } from '../actions/comments';
import { map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as itemActions from '../../actions/items';
import { Item } from '../../models/item';
import { pageSize } from '../reducers/pagination';
import { HACKER_NEWS_DB } from '../../hackernews-db';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions,
              private store: Store<fromComments.State>,
              @Inject(HACKER_NEWS_DB) private db: AngularFireDatabase) {
  }

  @Effect()
  loadComment$: Observable<Action> = this.actions$.pipe(
    ofType(CommentsActionTypes.Select),
    switchMap((action: commentsActions.Select) =>
      this.db.object(`/v0/item/${action.payload}`).valueChanges()
        .pipe(
          take(1),
          mergeMap((item: Item) => of<Action>(
            new itemActions.LoadSuccess([item]),
            new commentsActions.LoadSuccess(item),
            new itemActions.Load((item.kids || []).slice(0, pageSize))))
        )
    )
  );

  @Effect()
  loadMore$: Observable<Action> = this.actions$.pipe(
    ofType(CommentsActionTypes.LoadMore),
    withLatestFrom(this.store),
    map(([action, state]) => {
      const {
        items: { entities },
        comments: {pagination: { offset, limit },
        comments: { selectedItemId }}
      } = state;
      const ids = entities[selectedItemId].kids || [];
      return new itemActions.Load(ids.slice(offset, offset + limit));
    })
  );

}
