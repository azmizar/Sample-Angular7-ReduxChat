/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * 3rd patry imports
 */
import * as moment from 'moment';

/**
 * App imports
 */
import * as TestData from '../../tests/test.data';
import { User } from '../models/user.model';
import { UsersState, UsersReducer, getCurrentUser, getNonInteractiveUsers } from './users.reducer';
import { SET_CURRENT_USER } from './user.actions';
import { AppState } from './app.reducer';
import { Thread } from '../models/thread.model';
import { Message } from '../models/message.model';

/**
 * Unit test for users.reducer.ts
 */
describe('UsersReducer', () => { 
  let newUser: User;
  let curState: UsersState;
  let fullAppState: AppState;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // new user
    newUser = TestData.newUser;

    // existing state
    curState = {
      currentUser: null
    };

    // full app state
    fullAppState = TestData.fullAppState;
  });

  afterEach(() => { });

  /**
   * Test UsersReducer() with invalid action
   */
  it('should return existing USERS state if action is UNKNOWN', () => {
    // unknown action
    const action = {
      type: 'UNKNOWN',
      user: newUser
    };

    const newState: UsersState = UsersReducer(curState, action);

    expect(newState).toBe(curState);
  });

  /**
   * Test UsersReducer() with valid action
   */
  it('should return new USERS state without modifying existing state', () => {
    // SET_CURRENT_USER action
    const action = {
      type: SET_CURRENT_USER,
      user: newUser
    };

    const newState: UsersState = UsersReducer(curState, action);

    expect(newState).not.toBe(curState);
    expect(newState.currentUser).toBe(newUser);
  });

  /**
   * Test selectors
   */
  describe('Selectors', () => { 
    /**
     * getCurrentUser selector
     */
    it('getCurrentUser selector should return current user', () => { 
      const user: User = getCurrentUser(fullAppState);

      expect(user).toBe(newUser);
    });

    it('getNonInteractiveUsers should return all non-interactive users', () => {
      const users: User[] = getNonInteractiveUsers(fullAppState);

      expect(users.length).toBe(3);

      users.forEach((val: User) => { 
        expect(val.isClient).toBeFalsy();
      });
    });
  });
});
