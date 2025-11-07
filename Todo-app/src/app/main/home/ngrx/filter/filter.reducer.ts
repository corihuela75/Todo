import { createReducer, on } from '@ngrx/store';
import { setFilter } from './filter.action';

export const initialState: string = 'ALL';

export const filterReducer = createReducer(
  initialState,
  on(setFilter, (state, { filter }) => check(filter))
);

const check = (value: string) => {
  if (value === 'DONE' || value === 'PENDING' || value === 'ALL') {
    return value;
  }
  return 'ALL';
};
