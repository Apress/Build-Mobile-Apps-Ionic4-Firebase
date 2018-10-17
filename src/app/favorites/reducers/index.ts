import { FavoritesActions, FavoritesActionTypes } from '../actions/favorites';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import { getItemEntities } from '../../reducers/items';

export interface FavoritesItem {
  itemId: number;
  timestamp?: number;
  loading: boolean;
}

export const adapter: EntityAdapter<FavoritesItem> = createEntityAdapter<FavoritesItem>({
  selectId: (item: FavoritesItem) => item.itemId,
  sortComparer: (item1, item2) => item2.timestamp - item1.timestamp,
});

export type State = EntityState<FavoritesItem>;

export interface FavoritesState {
  auth: fromAuth.State;
  favorites: State;
}

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: FavoritesActions) {
  switch (action.type) {
    case FavoritesActionTypes.LoadSuccess: {
      return adapter.upsertMany(action.payload.map(item => ({
          ...item,
          loading: false,
      })), state);
    }

    case FavoritesActionTypes.Add: {
      return adapter.addOne({
        itemId: action.payload,
        loading: true,
      }, state);
    }

    case FavoritesActionTypes.Remove: {
      return adapter.updateOne({
        id: action.payload,
        changes: {
          loading: true,
        },
      }, state);
    }

    case FavoritesActionTypes.AddSuccess:
      const favorite = action.payload;
      return adapter.updateOne({
        id: favorite.itemId,
        changes: {
          ...favorite,
          loading: false,
        },
      }, state);

    case FavoritesActionTypes.RemoveFailure: {
      return adapter.updateOne({
        id: action.payload,
        changes: {
          loading: false,
        },
      }, state);
    }

    case FavoritesActionTypes.RemoveSuccess:
    case FavoritesActionTypes.AddFailure: {
      return adapter.removeOne(action.payload, state);
    }

    case FavoritesActionTypes.Clear: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getFavoritesState = createFeatureSelector<State>('favorites');

export const {
  selectEntities: selectFavoriteEntities,
  selectIds: selectFavorites,
} = adapter.getSelectors(getFavoritesState);


export const inFavorite = (itemId) => createSelector(
  selectFavoriteEntities,
  entities => entities[itemId] && !entities[itemId].loading
);

export const getLoading = (itemId) => createSelector(
  selectFavoriteEntities,
  entities => entities[itemId] && entities[itemId].loading
);

export const getFavoriteItems = createSelector(
  selectFavorites,
  selectFavoriteEntities,
  getItemEntities,
  (ids: number[], favorites, entities) =>
    ids.filter(id => favorites[id] && !favorites[id].loading)
      .map(id => entities[id])
);
