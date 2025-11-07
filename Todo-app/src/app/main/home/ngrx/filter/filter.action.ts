import { createAction, props } from '@ngrx/store';


export const setFilter = createAction(
  '[string] setFilter',
  props<{ filter: string }>()
);
