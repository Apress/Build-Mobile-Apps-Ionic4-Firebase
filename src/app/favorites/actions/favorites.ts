import { Action } from '@ngrx/store';
import { Favorite } from '../../models/favorite';

export enum FavoritesActionTypes {
  Load = '[Favorites] Load',
  LoadSuccess = '[Favorites] Load Success',
  LoadFailure = '[Favorites] Load Failure',
  Add = '[Favorites] Add',
  AddSuccess = '[Favorites] Add Success',
  AddFailure = '[Favorites] Add Failure',
  Remove = '[Favorites] Remove',
  RemoveSuccess = '[Favorites] Remove Success',
  RemoveFailure = '[Favorites] Remove Failure',
  Clear = '[Favorites] Clear',
}

export class Load implements Action {
  readonly type = FavoritesActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = FavoritesActionTypes.LoadSuccess;

  constructor(public payload: Favorite[]) {}
}

export class LoadFailure implements Action {
  readonly type = FavoritesActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export class Add implements Action {
  readonly type = FavoritesActionTypes.Add;

  constructor(public payload: number) {}
}

export class AddSuccess implements Action {
  readonly type = FavoritesActionTypes.AddSuccess;

  constructor(public payload: Favorite) {}
}

export class AddFailure implements Action {
  readonly type = FavoritesActionTypes.AddFailure;

  constructor(public payload: number) {}
}

export class Remove implements Action {
  readonly type = FavoritesActionTypes.Remove;

  constructor(public payload: number) {}
}

export class RemoveSuccess implements Action {
  readonly type = FavoritesActionTypes.RemoveSuccess;

  constructor(public payload: number) {}
}

export class RemoveFailure implements Action {
  readonly type = FavoritesActionTypes.RemoveFailure;

  constructor(public payload: number) {}
}

export class Clear implements Action {
  readonly type = FavoritesActionTypes.Clear;
}

export type FavoritesActions = Load | LoadSuccess | LoadFailure
  | Add | AddSuccess | AddFailure
  | Remove | RemoveSuccess | RemoveFailure | Clear;
