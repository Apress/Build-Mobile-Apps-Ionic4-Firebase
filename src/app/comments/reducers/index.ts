import * as fromRoot from '../../reducers';
import * as fromComments from './comments';
import * as fromPagination from './pagination';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { getItemEntities } from '../../reducers/items';

export interface CommentsState {
  comments: fromComments.State;
  pagination: fromPagination.State;
}

export interface State extends fromRoot.State {
  comments: CommentsState;
}

export const reducers: ActionReducerMap<CommentsState> = {
  comments: fromComments.reducer,
  pagination: fromPagination.reducer,
};

export const getCommentsFeatureState = createFeatureSelector<CommentsState>('comments');

export const getCommentsState = createSelector(
  getCommentsFeatureState,
  state => state.comments,
);

export const getPaginationState = createSelector(
  getCommentsFeatureState,
  state => state.pagination,
);

export const getSelectedItemId = createSelector(
  getCommentsState,
  fromComments.getSelectedItemId,
);

export const getSelectedItem = createSelector(
  getItemEntities,
  getSelectedItemId,
  (entities, id) => entities[id],
);

export const getSelectedItemChildren = createSelector(
  getSelectedItem,
  getItemEntities,
  getPaginationState,
  (item, entities, pagination) => {
    return item ? (item.kids || []).slice(0, pagination.offset + pagination.limit)
      .map(id => entities[id]) : [];
  }
);
