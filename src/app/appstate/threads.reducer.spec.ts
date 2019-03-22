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
import { ThreadsReducer, getCurrentThread, getAllThreads, getAllMessages, getUnreadMessageCount } from './threads.reducer';
import { SELECT_THREAD, ADD_THREAD, ADD_MESSAGE } from './thread.actions';
import { Message } from '../models/message.model';


describe('ThreadsReducer', () => { 
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => { });

  /**
   * ThreadsReducer() returns existing state for UNKNOWN action
   */
  it('should return original state for UNKNOWN action', () => { 
    const action = {
      type: 'UNKNOWN',
      thread: TestData.thd1
    };

    const newState = ThreadsReducer(TestData.fullAppState.threads, action);

    expect(newState).toBe(TestData.fullAppState.threads);
  });

  /**
   * ThreadsReducer() returns state with updated current thread for SELECT_THREAD
   */
  it('should return state with updated current thread for SELECT_THREAD', () => {
    const action = {
      type: SELECT_THREAD,
      thread: TestData.thd2
    };

    const newState = ThreadsReducer(TestData.fullAppState.threads, action);

    expect(newState).not.toBe(TestData.fullAppState.threads);
    expect(TestData.fullAppState.threads.currentThreadId).toBe(TestData.thd1.id);
    expect(newState.currentThreadId).toBe(TestData.thd2.id);
  });

  /**
   * ThreadsReducer() returns state with updated thread entities for ADD_THREAD
   */
  it('should return state with updated thread entities for ADD_THREAD', () => {
    const newThd = {
      id: 'newThd',
      name: 'New Thread',
      avatarSrc: 'https://www.microsoft.com/100',
      messages: []
    };

    const action = {
      type: ADD_THREAD,
      thread: newThd
    };

    const newState = ThreadsReducer(TestData.fullAppState.threads, action);

    expect(newState).not.toBe(TestData.fullAppState.threads);

    expect(TestData.fullAppState.threads.ids.length).toBe(2);
    expect(TestData.fullAppState.threads.ids[2]).toBeUndefined();
    expect(TestData.fullAppState.threads.entities[newThd.id]).toBeUndefined();

    expect(newState.ids.length).toBe(3);
    expect(newState.ids[2]).toBe(newThd.id);
    expect(newState.entities[newThd.id]).toBe(newThd);
  });

  /**
   * ThreadsReducer() returns state with updated messages for ADD_MESSAGE
   */
  it('should return state with updated messages for ADD_MESSAGE', () => {
    // new Message
    const newMsg: Message = {
      id: 'newMsg',
      author: TestData.newUser,
      isRead: false,
      sentAt: moment().toDate(),
      text: 'New message',
      thread: TestData.thd1
    };

    const action = {
      type: ADD_MESSAGE,
      thread: TestData.thd1,
      message: newMsg
    };

    const newState = ThreadsReducer(TestData.fullAppState.threads, action);

    expect(newState).not.toBe(TestData.fullAppState.threads);

    const origThdEnt = TestData.fullAppState.threads.entities[TestData.thd1.id];

    expect(origThdEnt.messages.length).toBe(2);
    expect(origThdEnt.messages[2]).toBeUndefined();

    const newThdEnt = newState.entities[TestData.thd1.id];

    expect(newThdEnt.messages.length).toBe(3);
    expect(newThdEnt.messages[2].id).toBe(newMsg.id);
  });

  /**
   * Selectors unit tests
   */
  describe('Selectors', () => { 
    /**
     * getCurrentThread() returns currently selected thread
     */
    it('getCurrentThread should return currently selected thread', () => { 
      const thd = getCurrentThread(TestData.fullAppState);

      expect(thd).toBeTruthy();
      expect(thd.id).toBe(TestData.thd1.id);
    });

    /**
     * getAllThreads() returns all of the threads
     */
    it('getAllThreads should return all of the threads', () => { 
      const thds = getAllThreads(TestData.fullAppState);

      expect(thds).toBeTruthy();
      expect(thds.length).toBe(2);
    });

    /**
     * getAllMessages() returns all of the messages
     */
    it('getAllMessages should return all messages', () => { 
      const msgs = getAllMessages(TestData.fullAppState);

      expect(msgs).toBeTruthy();
      expect(msgs.length).toBe(4);
    });

    /**
     * getUnreadMessageCount() returns the number of unread messages
     */
    it('getUnreadMessageCount should return the number of unread messages', () => {
      const count = getUnreadMessageCount(TestData.fullAppState);

      expect(count).toBe(3);
    });
  });
});
