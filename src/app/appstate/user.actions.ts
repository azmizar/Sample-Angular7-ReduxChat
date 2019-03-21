/**
 * 3rd party imports
 */
import { Action, ActionCreator } from 'redux';

/**
 * App imports
 */
import { User } from '../models/user.model';

// SET_CURRENT_USER action type
export const SET_CURRENT_USER = '[User] Set Current';

/**
 * SetCurrentUserAction action type
 */
export interface SetCurrentUserAction extends Action {
  user: User;
}

/**
 * Helper action creator to set current user
 * @param user User
 */
export const setCurrentUser: ActionCreator<SetCurrentUserAction> = (user: User) => { 
  return {
    type: SET_CURRENT_USER,
    // tslint:disable-next-line:object-literal-shorthand
    user: user
  };
};