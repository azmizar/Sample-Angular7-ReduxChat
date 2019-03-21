/**
 * 3rd party imports
 */
import { Action } from 'redux';

/**
 * App imports
 */
import { User } from '../models/user.model';
import * as UserActions from './user.actions';
import { StateSelector, AppState } from './app.reducer';

/**
 * UsersState model
 */
export interface UsersState {
  currentUser: User;
}

/**
 * Initial state
 */
const initialState: UsersState = {
  currentUser: null
};

/**
 * UsersReducer
 * @param state UsersState model
 * @param action User operation action
 */
export const UsersReducer = (state: UsersState = initialState, action: Action): UsersState => { 
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      return {
        currentUser: (action as UserActions.SetCurrentUserAction).user
      };
    
    default:
      return state;
  }
};

/**
 * Returns current user
 * @param state App state
 */
export const getCurrentUser: StateSelector<User> = (state: AppState): User => { 
  // not checking for null since we know our state will have valid object for .users
  return state.users.currentUser || null;
};
