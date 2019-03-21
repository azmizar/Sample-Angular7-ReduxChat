/**
 * 3rd party imports
 */
import { Action, Store } from 'redux';
import * as _ from 'lodash';

/**
 * App imports
 */
import { Thread } from '../models/thread.model';
import * as ThreadActions from './thread.actions';
import { Message } from '../models/message.model';
import { AppState, StateSelector } from './app.reducer';

/**
 * ThreadEntities model
 */
export interface ThreadsEntities {
  [id: string]: Thread;
}

/**
 * ThreadsState model
 */
export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
}

/**
 * Initial state
 */
const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

/**
 * ThreadsReducer
 * @param state ThreadsState object
 * @param action Action object
 */
export const ThreadsReducer = (state: ThreadsState = initialState, action: Action): ThreadsState => { 
  switch (action.type) {
    case ThreadActions.ADD_THREAD:
      // extract thread
      const addThread: Thread = (action as ThreadActions.AddThreadAction).thread;
      
      // return current state if thread already in the collection
      if (state.ids.includes(addThread.id)) {
        return state;
      }

      // return new state
      return {
        ids: [...state.ids, addThread.id],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [addThread.id]: addThread
        })
      };
    
    case ThreadActions.ADD_MESSAGE:
      // extract objects
      const tmpAction: ThreadActions.AddMessageAction = action as ThreadActions.AddMessageAction;
      const addMsgThread: Thread = tmpAction.thread;
      const addMessage: Message = tmpAction.message;

      // determine isRead flag
      const isRead: boolean = addMessage.thread.id === state.currentThreadId ? true : addMessage.isRead;

      // rebuild message object
      const newMessage: Message = Object.assign({}, addMessage, { isRead });

      // get current thread object
      const oldThread: Thread = state.entities[addMsgThread.id];

      // rebuild thread object with new message
      const newThread: Thread = Object.assign({}, oldThread, { messages: [...oldThread.messages, newMessage] });

      // return new state
      return {
        ids: state.ids,
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, { [newThread.id]: newThread })
      };
    
    case ThreadActions.SELECT_THREAD:
      // extract objects
      const selThread: Thread = (action as ThreadActions.SelectThreadAction).thread;

      // get thread
      const oldSelThread: Thread = state.entities[selThread.id];

      // mark all messages as read
      const newMessages: Message[] = oldSelThread.messages.map((msg: Message) => { 
        return Object.assign({}, msg, { isRead: true });
      });

      // rebuild new thread object
      const newSelThread: Thread = Object.assign({}, oldSelThread, { messages: newMessages });

      // return new state
      return {
        ids: state.ids,
        currentThreadId: selThread.id,
        entities: Object.assign({}, state.entities, { [selThread.id]: newSelThread })
      };
    
    default:
      return state;
  }
};

/**
 * Returns current active Thread
 * @param state App state
 */
export const getCurrentThread: StateSelector<Thread> = (state: AppState): Thread => { 
  const thdsState: ThreadsState = state.threads;

  // return current thread
  return thdsState.entities[thdsState.currentThreadId] || null;
};

/**
 * Returns all of Threads in app state (flatten)
 * @param state App state
 */
export const getAllThreads: StateSelector<Thread[]> = (state: AppState): Thread[] => {
  const thdsState: ThreadsState = state.threads;

  return _.flatMap(thdsState.entities, (value: Thread): Thread[] => {
    return [value];
  });
};

/**
 * Returns all of Messages from all Threads (flatten)
 * @param state App state
 */
export const getAllMessages: StateSelector<Message[]> = (state: AppState): Message[] => { 
  const thds: Thread[] = getAllThreads(state);

  return _.flatMap(thds, (value: Thread) => { 
    return [...value.messages];
  });
};

/**
 * Return total unread message count
 * @param state App state
 */
export const getUnreadMessageCount: StateSelector<number> = (state: AppState): number => { 
  const msgs: Message[] = getAllMessages(state);

  return _.reduce(msgs, (acc, msg: Message) => { 
    if (!msg.isRead) {
      acc++;
    }

    return acc;
  }, 0);
};
