import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as range from 'lodash.range';
import { Items } from '../../models/items';
import { Item } from '../../models/item';
import { Query } from './item.service';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class ItemServiceMock {
  private queries: Subject<Query> = new Subject<Query>();

  load(query: Query) {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    return this.queries.pipe(
      map(query => generateItems(query.offset, query.limit)),
      startWith([])
    );
  }
}

export function generateItems(offset: number, limit: number): Item[] {
  return range(offset, offset + limit).map(index => ({
    id: index,
    title: `Item ${index + 1}`,
    url: `http://www.example.com/item${index}`,
    by: `demo`,
    time: new Date().getTime() / 1000,
    score: index,
  }));
}
