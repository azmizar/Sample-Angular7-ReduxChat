/**
 * Angular imports
 */
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';
import * as moment from 'moment';

/**
 * App imports
 */
import { environment } from '../environments/environment';
import { User } from './models/user.model';
import { Thread } from './models/thread.model';
import { Message } from './models/message.model';
import { AppStore } from './appstate/app.store';
import { AppState } from './appstate/app.reducer';
import * as UserActions from './appstate/user.actions';
import * as ThreadsActions from './appstate/thread.actions';
import { generateUUID } from './util/uuid.util';
import { getAllMessages } from './appstate/threads.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Constructor
   * @param _store Redux store for AppState
   * @param _titleSvc Title service
   */
  constructor(@Inject(AppStore) private _store: Redux.Store<AppState>, private _titleSvc: Title) {
    // sets document title
    this._titleSvc.setTitle(`Angular7 Sample: Chat App with Redux`);

    // inject dummy data
    // users
    const interactiveUser: User = {
      id: generateUUID(),
      isClient: true, // <-- notice we're specifying the client as this User
      name: 'Azmizar',
      avatarSrc: 'assets/images/avatars/ch-logo.png'
    };

    const botCapUser: User = {
      id: generateUUID(),
      name: 'Ms. Capitalize',
      isClient: false,
      avatarSrc: 'assets/images/avatars/female-avatar-2.png'
    };

    const botEchoUser: User = {
      id: generateUUID(),
      name: 'Mr. Echo',
      isClient: false,
      avatarSrc: 'assets/images/avatars/male-avatar-1.png'
    };

    const botReverseUser: User = {
      id: generateUUID(),
      name: 'Ms. Reverse',
      isClient: false,
      avatarSrc: 'assets/images/avatars/female-avatar-4.png'
    };

    const botWaitUser: User = {
      id: generateUUID(),
      name: 'Mr. Waiting',
      isClient: false,
      avatarSrc: 'assets/images/avatars/male-avatar-2.png'
    };

    // threads
    const thdCapitalize: Thread = {
      id: generateUUID(),
      name: 'Capitalize Thread',
      avatarSrc: 'https://www.freeiconspng.com/uploads/robot-icon-17.png',
      messages: []
    };

    const thdEcho: Thread = {
      id: generateUUID(),
      name: 'Echo Thread',
      avatarSrc: 'https://www.freeiconspng.com/uploads/robot-icon-24.png',
      messages: []
    };

    const thdReverse: Thread = {
      id: generateUUID(),
      name: 'Reverse Thread',
      avatarSrc: 'https://www.freeiconspng.com/uploads/robot-icon-20.png',
      messages: []
    };

    const thdWait: Thread = {
      id: generateUUID(),
      name: 'Wait Thread',
      avatarSrc: 'https://www.freeiconspng.com/uploads/robot-icon-10.jpg',
      messages: []
    };

    // update current user
    this._store.dispatch(UserActions.setCurrentUser(interactiveUser));

    // add threads
    this._store.dispatch(ThreadsActions.addThread(thdCapitalize));
    this._store.dispatch(ThreadsActions.addThread(thdEcho));
    this._store.dispatch(ThreadsActions.addThread(thdReverse));
    this._store.dispatch(ThreadsActions.addThread(thdWait));

    // set current thread
    this._store.dispatch(ThreadsActions.selectThread(thdCapitalize));

    // add initial message
    this._store.dispatch(ThreadsActions.addMessage(thdCapitalize, {
      author: botCapUser,
      sentAt: moment().subtract(45, 'minutes').toDate(),
      text: 'Start the morning with a smile.'
    }));

    this._store.dispatch(ThreadsActions.addMessage(thdEcho, {
      author: botEchoUser,
      sentAt: moment().subtract(20, 'minutes').toDate(),
      text: 'I will echo you.'
    }));

    this._store.dispatch(ThreadsActions.addMessage(thdReverse, {
      author: botReverseUser,
      sentAt: moment().subtract(15, 'minutes').toDate(),
      text: 'I will reverse your sentences.'
    }));

    this._store.dispatch(ThreadsActions.addMessage(thdWait, {
      author: botWaitUser,
      sentAt: moment().subtract(8, 'minutes').toDate(),
      text: 'I will wait for you.'
    }));

    // bots replies (just a simple hacky way to keep track of replied messages)
    const repliedMsgs: { [id: string]: boolean } = {};

    this._store.subscribe(() => { 
      // get all messages
      const msgs: Message[] = getAllMessages(this._store.getState());

      msgs.forEach((val: Message) => { 
        // already replied?
        if (repliedMsgs[val.id]) {
          return;
        }

        // flag already replied
        repliedMsgs[val.id] = true;

        switch (val.thread.id) {
          case thdCapitalize.id:
            if (val.author.id !== botCapUser.id) {
              // msg came from different user than thread user
              this._store.dispatch(ThreadsActions.addMessage(val.thread, {
                author: botCapUser,
                sentAt: moment().toDate(),
                text: val.text.toUpperCase()
              }));
            }

            break;
            
          case thdEcho.id:
            if (val.author.id !== botEchoUser.id) {
              // msg came from different user than thread user
              this._store.dispatch(ThreadsActions.addMessage(val.thread, {
                author: botEchoUser,
                sentAt: moment().toDate(),
                text: val.text
              }));
            }

            break;
            
          case thdReverse.id:
            if (val.author.id !== botReverseUser.id) {
              // msg came from different user than thread user
              this._store.dispatch(ThreadsActions.addMessage(val.thread, {
                author: botReverseUser,
                sentAt: moment().toDate(),
                text: val.text.split(' ').reverse().join(' ')
              }));
            }

            break;
            
          case thdWait.id:
            if (val.author.id !== botWaitUser.id) {
              // tslint:disable-next-line:radix
              const waitSec: number = Number.isNaN(parseInt(val.text)) ? 5 : parseInt(val.text);

              // msg came from different user than thread user
              setTimeout(() => { 
                this._store.dispatch(ThreadsActions.addMessage(val.thread, {
                  author: botWaitUser,
                  sentAt: moment().toDate(),
                  text: `${ val.text } (delayed ${ waitSec }secs)`
                }));
              }, waitSec * 1000);
            }

            break;
        }
      });
    });
  }

  /**
   * Gets to document title
   */
  get title(): string {
    return this._titleSvc.getTitle();
  }
}
