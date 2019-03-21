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
import { AppStore } from '../appstate/app.store';
import { AppState } from '../appstate/app.reducer';
import { getAllThreads, getCurrentThread } from '../appstate/threads.reducer';
import { Thread } from '../models/thread.model';
import * as ThreadsAction from '../appstate/thread.actions';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Thread[];
  selectedThread: Thread;

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
    const appState: AppState = this._store.getState();

    this.threads = getAllThreads(appState);
    this.selectedThread = getCurrentThread(appState);
  }

  /**
   * Select thread as current thread
   * @param thd Thread to select as current
   */
  onSelectThread(thd: Thread): void {
    this._store.dispatch(ThreadsAction.selectThread(thd));
  }
}
