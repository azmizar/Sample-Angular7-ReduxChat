import * as moment from 'moment';

import { AppState } from 'src/app/appstate/app.reducer';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { User } from 'src/app/models/user.model';

// new user
const newUser: User = {
  id: 'mynewid',
  name: 'Azmizar Ujang',
  avatarSrc: 'https://www.google.com',
  isClient: true
};

// non-intactive user 1
const nonIUser1: User = {
  id: 'nonIUser1',
  name: 'User 1',
  avatarSrc: 'https://www.google.com/1',
  isClient: false
};

// non-intactive user 2
const nonIUser2: User = {
  id: 'nonIUser2',
  name: 'User 2',
  avatarSrc: 'https://www.google.com/2',
  isClient: false
};

// non-intactive user 3
const nonIUser3: User = {
  id: 'nonIUser3',
  name: 'User 3',
  avatarSrc: 'https://www.google.com/3',
  isClient: false
};

// thread 1
const thd1: Thread = {
  id: 'thd1',
  name: 'Thread 1',
  avatarSrc: 'https://www.microsoft.com/1',
  messages: []
};

// thread 2
const thd2: Thread = {
  id: 'thd2',
  name: 'Thread 2',
  avatarSrc: 'https://www.microsoft.com/2',
  messages: []
};

// message 1
const msg1: Message = {
  id: 'msg1',
  author: newUser,
  isRead: true,
  sentAt: moment().toDate(),
  text: 'Message 1',
  thread: thd1
};

// message 2
const msg2: Message = {
  id: 'msg2',
  author: nonIUser1,
  isRead: false,
  sentAt: moment().toDate(),
  text: 'Message 2',
  thread: thd1
};

// message 3
const msg3: Message = {
  id: 'msg3',
  author: nonIUser2,
  isRead: false,
  sentAt: moment().toDate(),
  text: 'Message 3',
  thread: thd2
};

// message 4
const msg4: Message = {
  id: 'msg4',
  author: nonIUser3,
  isRead: false,
  sentAt: moment().toDate(),
  text: 'Message 4',
  thread: thd2
};

thd1.messages = [msg1, msg2];
thd2.messages = [msg3, msg4];

// full state
const fullAppState: AppState = {
  threads: {
    ids: [],
    entities: {},
    currentThreadId: null
  },
  users: {
    currentUser: newUser
  }
};

fullAppState.threads.currentThreadId = thd1.id;
fullAppState.threads.ids = [thd1.id, thd2.id];
fullAppState.threads.entities[thd1.id] = thd1;
fullAppState.threads.entities[thd2.id] = thd2;

export { newUser, nonIUser1, nonIUser2, nonIUser3, thd1, thd2, msg1, msg2, msg3, msg4, fullAppState };
