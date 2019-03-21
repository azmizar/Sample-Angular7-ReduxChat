/**
 * Angular imports
 */
import { Component, OnInit, Inject } from '@angular/core';

/**
 * 3rd party import
 */
import * as Redux from 'redux';
import * as moment from 'moment';

/**
 * App imports
 */
import { Thread } from '../models/thread.model';
import { User } from '../models/user.model';
import { AppState } from '../appstate/app.reducer';
import { AppStore } from '../appstate/app.store';
import { getCurrentThread } from '../appstate/threads.reducer';
import { getCurrentUser } from '../appstate/users.reducer';
import * as ThreadsActions from '../appstate/thread.actions';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  thread: Thread;
  currentUser: User;

  /**
   * Constructor
   */
  constructor(@Inject(AppStore) private _store: Redux.Store<AppState>) { 
    this._store.subscribe(() => { 
      this.updateState();
    });

    this.updateState();
  }

  /**
   * Handles OnInit()
   */
  ngOnInit() { }

  /**
   * Update component based on state changes
   */
  updateState() {
    const appState = this._store.getState();

    this.thread = getCurrentThread(appState);
    this.currentUser = getCurrentUser(appState);
  }

  /**
   * Sends message to chat thread
   * @param msg Message to send
   */
  sendMessage(msg: string): void {
    this._store.dispatch(ThreadsActions.addMessage(this.thread, {
      author: this.currentUser,
      sentAt: moment(),
      isClient: true,
      text: msg
    }));
  }
}
