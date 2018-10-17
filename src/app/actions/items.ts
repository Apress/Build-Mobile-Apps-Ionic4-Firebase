import { Action } from '@ngrx/store';
import { Item } from '../models/item';

export enum ItemActionTypes {
  Load = '[Items] Load',
  LoadSuccess = '[Items] Load Success',
  LoadFail = '[Items] Load Fail',
}

export class Load implements Action {
  readonly type = ItemActionTypes.Load;

  constructor(public payload: number[]) {}
}

export class LoadSuccess implements Action {
  readonly type = ItemActionTypes.LoadSuccess;

  constructor(public payload: Item[]) {}
}

export class LoadFail implements Action {
  readonly type = ItemActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type ItemActions = Load | LoadSuccess | LoadFail;
