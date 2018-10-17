import * as fromItems from './items';
import { reducer } from './items';
import { Load, LoadFail, LoadSuccess } from '../actions/items';
import { createMockItem } from '../models/item';

describe('ItemsReducer', () => {
  const item1 = createMockItem(1);
  const item2 = createMockItem(2);
  const item3 = createMockItem(3);

  const initialState: fromItems.State = {
    ids: [item1.id, item2.id],
    entities: {
      [item1.id]: item1,
      [item2.id]: item2,
    },
    loading: false,
    error: null,
  };

  it('should set the loading state', () => {
    const action = new Load([item3.id]);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should set the loaded items', () => {
    const action = new LoadSuccess([item3]);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.ids).toContain(item3.id);
    expect(result.entities[item3.id]).toEqual(item3);
  });

  it('should set the fail state', () => {
    const error = new Error('load fail');
    const action = new LoadFail(error);
    const result = reducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.error).toEqual(error);
  });

  it('should select the the loading state', () => {
    const result = fromItems.getLoading(initialState);
    expect(result).toBe(false);
  });
});
