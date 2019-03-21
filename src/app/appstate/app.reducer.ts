/**
 * 3rd party imports
 */
import { Reducer, combineReducers } from 'redux';

/**
 * App imports
 */
import { UsersState, UsersReducer } from './users.reducer';
import { ThreadsState, ThreadsReducer } from './threads.reducer';

/**
 * Application state
 */
export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

/**
 * StateSelector function that takes app state and return entity T from it.
 */
export type StateSelector<T> = (state: AppState) => T;

/**
 * Root reducer
 */
const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
});

// default export for this module
export default rootReducer;
