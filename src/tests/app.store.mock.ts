/**
 * 3rd party imports
 */
import * as Redux from 'redux';

/**
 * App imports
 */
import { AppState } from 'src/app/appstate/app.reducer';
import { fullAppState, emptyAppState } from './test.data';

/**
 * Mock app store (note that mock only support 1 callback)
 */
export class MockAppStore implements Redux.Store<AppState> {
  private _state: AppState;
  private _cb: () => void;

  constructor() {
    this._state = emptyAppState;  
    this._cb = null;
  }

  /**
   * Assigns fake state to the store
   * @param state AppState to set it to
   */
  setFakeState(state: AppState): void {
    this._state = state;

    // this is mock - we will trigger subscriber event since this is a shortcut to change
    // the internal state
    if (this._cb) {
      this._cb();
    }
  }

  /** 
   * Get current app state
   */
  getState(): AppState { 
    return this._state;
  }

  /**
   * Assign subscriner
   * @param cb Listener callback/subscriber
   */
  subscribe(cb: () => void): Redux.Unsubscribe { 
    this._cb = cb;

    return () => { 
      this._cb = null;
    };
  }

  /**
   * Replace reducer (not implemented)
   * @param r reducer function
   */
  replaceReducer(r: Redux.Reducer): void { }

  /**
   * Internal dispatch function
   * @param action Action to dispatch
   */
  private _disp<T extends Redux.Action>(action: T): T { 
    // this is mock - so we don't do any action but we will trigger subscriber event
    if (this._cb) {
      this._cb();
    }

    return action;
  }

  /**
   * Gets dispatcher
   */
  get dispatch(): Redux.Dispatch {
    return this._disp;
  }

  /**
   * Sets dispatcher (not implemented)
   */
  set dispatch(action: Redux.Dispatch<Redux.AnyAction>) { }
}
