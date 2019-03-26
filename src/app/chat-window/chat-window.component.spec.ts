/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * App imports
 */
import { ChatWindowComponent } from './chat-window.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { AppStore } from '../appstate/app.store';
import { MockAppStore } from 'src/tests/app.store.mock';
import * as TestData from 'src/tests/test.data';
import { ADD_MESSAGE } from '../appstate/thread.actions';

/**
 * Unit tests for chat-window
 */
describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatWindowComponent,
        ChatMessagesComponent,
        ChatMessageComponent
      ],
      providers: [
        { provide: AppStore, useClass: MockAppStore }
      ]
    })
      .compileComponents();
    
    console.clear();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Instantiate w/ default values
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Display thread is not selected DIV and hide selected DIV
   */
  it('should display thread is not selected DIV and hide selected DIV', () => {
    //  get AppStore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // get thread selected DIV
    let el: DebugElement = fixture.debugElement.query(By.css('.thread-not-set'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.innerHTML).toContain('None Selected');

    // get thread not selected DIV
    el = fixture.debugElement.query(By.css('.thread-is-set'));

    expect(el).toBeFalsy();
  });

  /**
   * Display thread is selected DIV and hide not selected DIV
   */
  it('should display thread is selected DIV and hide not selected DIV', () => {
    //  get AppStore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // set fake state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // get thread selected DIV
    let el: DebugElement = fixture.debugElement.query(By.css('.thread-is-set'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.innerHTML).toContain(TestData.thd1.name);

    // get thread not selected DIV
    el = fixture.debugElement.query(By.css('.thread-not-set'));

    expect(el).toBeFalsy();
  });

  /**
   * Has 1x chat-messages directive
   */
  it('should have 1x chat-messages directive', () => {
    //  get AppStore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // set fake state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // get chat-threads
    const els: DebugElement[] = fixture.debugElement.queryAll(By.directive(ChatMessagesComponent));

    expect(els).toBeTruthy();
    expect(els.length).toBe(1);
  });

  /**
   * Has 2x chat-message directives
   */
  it('should have 2x chat-message directives', () => {
    //  get AppStore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // set fake state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // get chat-threads
    const els: DebugElement[] = fixture.debugElement.queryAll(By.directive(ChatMessageComponent));

    expect(els).toBeTruthy();
    expect(els.length).toBe(2);
  });

  /**
   * Call AppStore dispatch when Send is clicked on
   */
  it('should call AppStore dispatch() when Send is clicked', () => { 
    //  get AppStore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // set fake state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // get message input box
    const msgInput: DebugElement = fixture.debugElement.query(By.css('[type="text"]'));

    expect(msgInput).toBeTruthy();

    msgInput.nativeElement.value = 'Hello there';
    
    fixture.detectChanges();

    // spies
    const updateStateSpy = spyOn(component, 'updateState').and.callThrough();
    const dispatchSpy = spyOn(appStore, 'dispatch').and.callThrough();

    // get the button
    const btn: DebugElement = fixture.debugElement.query(By.css('button'));

    expect(btn).toBeTruthy();

    btn.triggerEventHandler('click', null);
    
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(updateStateSpy).toHaveBeenCalledTimes(1);
  });
});
