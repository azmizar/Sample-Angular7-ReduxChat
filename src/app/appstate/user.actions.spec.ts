/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * App imports
 */
import * as UsersActions from './user.actions';
import { User } from '../models/user.model';

/**
 * Unit test for user.actions.ts
 */
describe('UserActions', () => { 
  beforeEach(() => { 
    TestBed.configureTestingModule({ });
  });

  afterEach(() => { });

  /**
   * Test setCurrentUser()
   */
  it('creates SET_CURRENT_USER action', () => { 
    // new user
    const newUser: User = {
      id: 'mynewid',
      name: 'Azmizar Ujang',
      avatarSrc: 'https://www.google.com',
      isClient: true
    };

    const action: UsersActions.SetCurrentUserAction = UsersActions.setCurrentUser(newUser);

    expect(action).toBeTruthy();
    expect(action.type).toBe(UsersActions.SET_CURRENT_USER);
    expect(action.user).toBe(newUser);
  });
});