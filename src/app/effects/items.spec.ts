import { Actions } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { ItemsEffects } from './items';
import { Load, LoadFail, LoadSuccess } from '../actions/items';
import { createMockItem } from '../models/item';
import { HACKER_NEWS_DB } from '../hackernews-db';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ItemsEffects', () => {
  let db: any;
  let effects: ItemsEffects;
  let actions$: TestActions;

  const item1 = createMockItem(1);
  const item2 = createMockItem(2);

  beforeEach(() => {
    const dbMock = {
      object: jasmine.createSpy('object'),
    };
    TestBed.configureTestingModule({
      providers: [
        ItemsEffects,
        { provide: Actions, useFactory: getActions },
        { provide: HACKER_NEWS_DB, useValue: dbMock },
      ],
    });

    db = TestBed.get(HACKER_NEWS_DB);
    effects = TestBed.get(ItemsEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('loadItem$', () => {
    it('should return a LoadSuccess with items, on success', () => {
      const action = new Load([1, 2]);
      const completion = new LoadSuccess([item1, item2]);

      actions$.stream = hot('-a', { a: action });
      db.object = jasmine.createSpy('object').and.callFake(path => {
        const id = parseInt(/\/v0\/item\/(\d+)/.exec(path)[1], 10);
        const item = id === 1 ? item1 : item2;
        return {
          valueChanges: () => cold('-b', { b: item }),
        };
      });
      const expected = cold('--c', { c: completion });
      expect(effects.loadItems$).toBeObservable(expected);
    });

    it('should return a LoadFail with error, on error', () => {
      const action = new Load([1, 2]);
      const error = 'Error';
      const completion = new LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      db.object = jasmine.createSpy('object').and.callFake(path => {
        return {
          valueChanges: () => cold('-#', {}, error),
        };
      });
      const expected = cold('--c', { c: completion });
      expect(effects.loadItems$).toBeObservable(expected);
    });
  });
});
