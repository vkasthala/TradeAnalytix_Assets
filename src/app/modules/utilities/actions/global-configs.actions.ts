import {createAction, props} from '@ngrx/store';

export enum GlobalConfigsActionTypes {
  updateCurrentRoute = '[GlobalCOnfigs] Update Route Route',
  ResetGlobalConfig = '[GlobalConfigs] Reset Global Config'
}

export const updateCurrentRoute = createAction<GlobalConfigsActionTypes, {}>(GlobalConfigsActionTypes.updateCurrentRoute, props<{currentRoute: string}>());
export const resetGlobalConfig = createAction<GlobalConfigsActionTypes, {}>(GlobalConfigsActionTypes.ResetGlobalConfig, props<{}>());
