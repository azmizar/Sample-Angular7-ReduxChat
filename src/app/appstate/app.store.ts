/**
 * Angular imports
 */
import { InjectionToken } from '@angular/core';

/**
 * 3rd party imports
 */
import { Store, createStore } from 'redux';

/**
 * App imports
 */
import { AppState, default as reducer } from './app.reducer';

// DI token for App store
export const AppStore = new InjectionToken('App.store');

// factory to create store
export function createAppStore(): Store<AppState> { 
  return createStore(reducer);
}

// AppStore DI
export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];
