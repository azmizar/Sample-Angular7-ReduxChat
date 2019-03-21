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
import { getUnreadMessageCount } from '../appstate/threads.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  unreadCount: number;

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
    this.unreadCount = getUnreadMessageCount(this._store.getState());
  }
}
