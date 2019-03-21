/**
 * Angular imports
 */
import { Component, Inject } from '@angular/core';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';
import * as moment from 'moment';

/**
 * App imports
 */
import { User } from './models/user.model';
import { Thread } from './models/thread.model';
import { Message } from './models/message.model';
import { AppStore } from './appstate/app.store';
import { AppState } from './appstate/app.reducer';
import * as UserActions from './appstate/user.actions';
import * as ThreadsActions from './appstate/thread.actions';
import { generateUUID } from './util/uuid.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(@Inject(AppStore) private _store: Redux.Store<AppState>) {
    // inject dummy data

    // users
    const interactiveUser: User = {
      id: generateUUID(),
      isClient: true, // <-- notice we're specifying the client as this User
      name: 'Azmizar',
      avatarSrc: 'assets/images/avatars/female-avatar-1.png'
    };

    const botCapUser: User = {
      id: generateUUID(),
      name: 'Ms. Capitalize',
      avatarSrc: 'assets/images/avatars/female-avatar-2.png'
    };

    const botEchoUser: User = {
      id: generateUUID(),
      name: 'Mr. Echo',
      avatarSrc: 'assets/images/avatars/male-avatar-1.png'
    };

    const botReverseUser: User = {
      id: generateUUID(),
      name: 'Ms. Reverse',
      avatarSrc: 'assets/images/avatars/female-avatar-4.png'
    };

    const botWaitUser: User = {
      id: generateUUID(),
      name: 'Mr. Waiting',
      avatarSrc: 'assets/images/avatars/male-avatar-2.png'
    };

    // threads
    const thdCapitalize: Thread = {
      id: generateUUID(),
      name: 'Capitalize Thread',
      avatarSrc: 'http://demo.visualdialog.org/static/images/bot.png',
      messages: []
    };

    const thdEcho: Thread = {
      id: generateUUID(),
      name: 'Echo Thread',
      avatarSrc: 'https://raw.githubusercontent.com/TelegramBots/Telegram.Bot.Extensions.Passport/master/package-icon.gif',
      messages: []
    };

    const thdReverse: Thread = {
      id: generateUUID(),
      name: 'Reverse Thread',
      avatarSrc: 'https://cdn0.iconfinder.com/data/icons/science-10/450/robot-512.png',
      messages: []
    };

    const thdWait: Thread = {
      id: generateUUID(),
      name: 'Wait Thread',
      avatarSrc: 'https://telegram.org/file/811140614/2/flKQKZ7xUOE.27938.gif/5574a04570218c9e11',
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
      author: interactiveUser,
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
  }
}
