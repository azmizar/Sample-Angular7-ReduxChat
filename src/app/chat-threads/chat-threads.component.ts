/**
 * Angular imports
 */
import { Component, OnInit, Inject } from '@angular/core';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * App imports
 */
import { AppStore } from '../appstate/app.store';
import { AppState } from '../appstate/app.reducer';
import { getAllThreads, getCurrentThread } from '../appstate/threads.reducer';
import { Thread } from '../models/thread.model';
import * as ThreadsActions from '../appstate/thread.actions';
import { QuotesService } from '../quotes.service';
import { User } from '../models/user.model';
import { getNonInteractiveUsers } from '../appstate/users.reducer';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Thread[];
  selectedThread: Thread;
  enableRandomMessage: boolean;

  /**
   * Constructor
   */
  constructor(@Inject(AppStore) private _store: Redux.Store<AppState>, private _quoteSvc: QuotesService) {
    this._store.subscribe(() => { 
      this.updateState();
    });

    this.updateState();
  }

  /**
   * Handles OnInit()
   */
  ngOnInit() { 
    // trigger auto-message submission every 10 secs
    setInterval(this.sendRandomMessage.bind(this), 10000);
  }

  /**
   * Update component based on state changes
   */
  updateState() {
    const appState: AppState = this._store.getState();

    this.threads = getAllThreads(appState);
    this.selectedThread = getCurrentThread(appState);
  }

  /**
   * Select thread as current thread
   * @param thd Thread to select as current
   */
  onSelectThread(thd: Thread): void {
    this._store.dispatch(ThreadsActions.selectThread(thd));
  }

  /**
   * Enables/disables random message
   * @param val True to enable random message, False otherwise
   */
  onActivateRandomMessage(val: boolean): void {
    this.enableRandomMessage = val;
  }

  /**
   * Sends random message to random thread as random user
   */
  async sendRandomMessage() {
    if (!this.enableRandomMessage) {
      return;
    }

    // get all threads
    const thds: Thread[] = getAllThreads(this._store.getState());

    // get all non-interactive users
    const users: User[] = getNonInteractiveUsers(this._store.getState());

    // randomly select a thread and a user
    const thd: Thread = thds[_.random(0, (thds.length - 1), false)];
    const user: User = users[_.random(0, (users.length - 1), false)];

    // get randon quote
    const quote: string = await this._quoteSvc.getQuote();

    // send message
    this._store.dispatch(ThreadsActions.addMessage(thd, {
      author: user,
      sentAt: moment().toDate(),
      text: quote
    }));
  }
}
