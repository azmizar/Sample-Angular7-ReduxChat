/**
 * 3rd party imports
 */
import { Action, ActionCreator } from 'redux';
import { v4 as uuid } from 'uuid';
/**
 * App imports
 */
import { Thread } from '../models/thread.model';
import { Message } from '../models/message.model';

// ADD_THREAD action type
export const ADD_THREAD = '[Thread] Add';

/**
 * AddThreadAction action type
 */
export interface AddThreadAction extends Action {
  thread: Thread;
}

/**
 * HElper action creator to add thread
 * @param thread Thread to add
 */
export const addThread: ActionCreator<AddThreadAction> = (thread: Thread) => { 
  return {
    type: ADD_THREAD,
    // tslint:disable-next-line:object-literal-shorthand
    thread: thread
  };
};

// ADD_MESSAGE action type
export const ADD_MESSAGE = '[Thread] Add Message';

/**
 * AddMesageAction action type
 */
export interface AddMessageAction extends Action {
  thread: Thread;
  message: Message;
}

/**
 * Helper action creator to add message to the thread
 * @param thread Thread to add the message to
 * @param messageArgs Message to add to the thread
 */
export const addMessage: ActionCreator<AddMessageAction> = (thread: Thread, messageArgs: Message): AddMessageAction => { 
  // default message object
  const defaults = {
    id: uuid(),
    sentAt: new Date(),
    isRead: false,
    // tslint:disable-next-line:object-literal-shorthand
    thread: thread
  };

  // create new message
  const message: Message = Object.assign({}, defaults, messageArgs);

  return {
    type: ADD_MESSAGE,
    // tslint:disable-next-line:object-literal-shorthand
    thread: thread,
    // tslint:disable-next-line:object-literal-shorthand
    message: message
  };
};

// SELECT_THREAD action type
export const SELECT_THREAD = '[Thread] Select';

/**
 * SelectThreadAction action definition
 */
export interface SelectThreadAction extends Action {
  thread: Thread;
}

/**
 * Helper action creator to select a thread
 * @param thread Thread to select
 */
export const selectThread: ActionCreator<SelectThreadAction> = (thread: Thread): SelectThreadAction => { 
  return {
    type: SELECT_THREAD,
    // tslint:disable-next-line:object-literal-shorthand
    thread: thread
  };
};
