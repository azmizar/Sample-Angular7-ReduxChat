/**
 * Angular imports
 */
import { Component, OnInit, Inject } from '@angular/core';

/**
 * 3rd party import
 */
import * as Redux from 'redux';

/**
 * App imports
 */
import { Thread } from '../models/thread.model';
import { AppState } from '../appstate/app.reducer';
import { AppStore } from '../appstate/app.store';
import { getCurrentThread } from '../appstate/threads.reducer';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  thread: Thread;

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
    this.thread = getCurrentThread(this._store.getState());
  }
}
