import moment from 'moment';

export interface Item {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  text?: string;
  descendants?: number;
  kids?: number[];
}

export function relativeTime(time: number) {
  return moment.duration(moment().diff(moment(time * 1000))).humanize();
}

export function createMockItem(id: number = 1): Item {
  return {
    id,
    title: `test item ${id}`,
    url: `http://www.example.com/${id}`,
    by: 'author',
    time: new Date().getTime() / 1000,
    score: 100,
  };
}
