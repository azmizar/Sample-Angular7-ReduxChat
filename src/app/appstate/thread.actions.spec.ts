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
import * as TestData from '../../tests/test.data';
import * as ThreadActions from './thread.actions';

/**
 * Unit test for thread.actions.ts
 */
describe('ThreadActions', () => { 
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => { });

  /**
   * addThread() creating AddThreadAction
   */
  it('should create AddThreadAction object', () => { 
    const action = ThreadActions.addThread(TestData.thd1);

    expect(action.type).toBe(ThreadActions.ADD_THREAD);
    expect(action.thread).toBe(TestData.thd1);
  });

  /**
   * addMessage() creating AddMessageAction
   */
  it('should create AddMessageAction object', () => {
    const action = ThreadActions.addMessage(TestData.thd1, TestData.msg1);

    expect(action.type).toBe(ThreadActions.ADD_MESSAGE);
    expect(action.thread).toBe(TestData.thd1);
    expect(action.message).toBe(TestData.msg1);
  });

  /**
   * selectThread() createing SelectThreadAction
   */
  it('should create SelectThreadAction object', () => {
    const action = ThreadActions.addThread(TestData.thd1);

    expect(action.type).toBe(ThreadActions.SELECT_THREAD);
    expect(action.thread).toBe(TestData.thd1);
  });
});
