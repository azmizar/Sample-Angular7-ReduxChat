/**
 * 3rd party imports
 */
import * as Redux from 'redux';

/**
 * App imports
 */
import { AppState } from 'src/app/appstate/app.reducer';
import { emptyAppState } from './test.data';

/**
 * Mock app store (note that mock only support 1 callback)
 */
export class MockAppStore {
  private _state: AppState;
  private _cb: Array<() => void>;

  /**
   * Constructor
   */
  constructor() {
    this._state = emptyAppState;
    this._cb = [];
  }

  /**
   * Assigns state to mock
   * @param state AppState object
   */
  setFakeState(state: AppState) {
    this._state = state;

    // mock trigger action since this is changing internal state
    this.dispatch({ type: 'UPDATE_STATE', newState: state });
  }

  /**
   * Returns current state
   */
  getState(): AppState {
    return this._state;
  }

  /**
   * Replace next reducer (not implemented)
   */
  replaceReducer(): void { }

  /**
   * Subscribe to AppState changes
   * @param cb Callback when changes to AppState occurs
   */
  subscribe(cb: () => void): () => void {
    this._cb.push(cb);
    
    return () => { 
      // unsubscribe
      this._cb = this._cb.filter((cbFn) => { 
        return !(cb === cbFn);
      });
    };
  }

  /**
   * Dispatches action (does not actually modify the state in the store - use setFakeState() to do so)
   * @param action Dispatch action
   */
  dispatch(action: any) {
    if (this._cb) {
      this._cb.forEach((cbFn) => { 
        cbFn();
      });
    }

    return action;
  }
}
