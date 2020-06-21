import { environment } from 'src/environments/environment';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromGlobalConfig from './global-config.reducer';

export interface State {
  [fromGlobalConfig.globalConfigFeatureKey]: fromGlobalConfig.State;
}

// @ts-ignore
export const reducers: ActionReducerMap<State> = {};
reducers[fromGlobalConfig.globalConfigFeatureKey] = fromGlobalConfig.reducer;


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
