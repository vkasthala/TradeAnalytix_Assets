import { Action } from '@ngrx/store';
import { GlobalConfigsActionTypes } from '../actions/global-configs.actions';


export const globalConfigFeatureKey = 'globalConfig';

export interface State {
  currentRoute: string;
}

export const initialState: State = {
  currentRoute : ''
};


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case GlobalConfigsActionTypes.updateCurrentRoute:
     return { ...state, currentRoute: (action as any).currentRoute } as State;
    case GlobalConfigsActionTypes.ResetGlobalConfig:
      return { ...initialState } as State;
    default:
      return state;
  }
}
