/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';
import * as moment from 'moment';

/**
 * App imports
 */
import { default as reducer, AppState } from './app.reducer';
import * as TestData from '../../tests/test.data';
import { SET_CURRENT_USER } from './user.actions';
import { SELECT_THREAD } from './thread.actions';

/**
 * Unit tests for app.reducer.ts
 * Note since the only exposed function is reducer() and this is 
 * a combined reducers, we will only test 2 basic functions since
 * users.reducer.ts and threads.reducer.ts will be tested in detail
 */
describe('AppReducers', () => { 
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => { });

  /**
   * reducer() with invalid action
   */
  it('should return existing AppState with invalid action', () => { 
    const state: AppState = {
      users: null,
      threads: null
    };

    const action = {
      type: 'UNKNOWN',
      user: null
    };

    const newState: AppState = reducer(state, action);

    expect(newState).toBe(state);
  });

  /**
   * reducer() with SET_CURRENT_USER action
   */
  it('should return AppState with current user set when called with SET_CURRENT_USER action', () => { 
    const action = {
      type: SET_CURRENT_USER,
      user: TestData.nonIUser1
    };

    const newState = reducer(TestData.fullAppState, action);

    expect(newState).not.toBe(TestData.fullAppState);
    expect(newState.users.currentUser).toBe(TestData.nonIUser1);
  });

  /**
   * reducer() with SELECT_THREAD action
   */
  it('should return AppState with current thread set when called with SELECT_THREAD action', () => {
    const action = {
      type: SELECT_THREAD,
      thread: TestData.thd2
    };

    const newState = reducer(TestData.fullAppState, action);

    expect(newState).not.toBe(TestData.fullAppState);
    expect(newState.threads.currentThreadId).toBe(TestData.thd2.id);
  });
});
