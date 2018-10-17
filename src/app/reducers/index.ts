import { ActionReducerMap } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import * as fromItems from './items';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  items: fromItems.reducer,
};
