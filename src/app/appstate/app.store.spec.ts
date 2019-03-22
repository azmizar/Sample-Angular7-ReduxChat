/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * 3rd party imports
 */
import * as Redux from 'redux';

/**
 * App imports
 */
import * as AppStoreMod from './app.store';
import { AppState } from './app.reducer';

/**
 * Unit test for AppStore
 */
describe('AppStore', () => { 
  beforeEach(() => { 
    TestBed.configureTestingModule({ 
      providers: [
        AppStoreMod.appStoreProviders
      ]
    });
  });

  afterEach(() => { });

  // available via dependency injection
  it('available via DI', () => { 
    const store = TestBed.get(AppStoreMod.AppStore);
    expect(store).toBeTruthy();
  });

  // return default AppState
  it('returns default AppState', () => { 
    const store: Redux.Store<AppState> = TestBed.get(AppStoreMod.AppStore);
    const state: AppState = store.getState();

    expect(state).toBeTruthy();
    expect(state.users.currentUser).toBeNull();
    expect(state.threads.ids.length).toBe(0); 
    expect(Object.keys(state.threads.entities).length).toBe(0);
    expect(state.threads.currentThreadId).toBeNull();
  });
});
