/**
 * Angular imports
 */
import { Component, OnInit, Inject } from '@angular/core';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';

/**
 * App imports
 */
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';
import { User } from '../models/user.model';
import { AppStore } from '../appstate/app.store';
import { AppState } from '../appstate/app.reducer';
import { getCurrentThread } from '../appstate/threads.reducer';
import { getCurrentUser } from '../appstate/users.reducer';

@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  thread: Thread;
  user: User;
  messages: Array<Message>;

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
    this.messages = this.thread ? this.thread.messages : [];

    this.user = getCurrentUser(appState);
  }
}
