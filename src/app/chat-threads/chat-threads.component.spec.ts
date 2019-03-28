/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * 3rd party imports
 */
import * as moment from 'moment';

/**
 * App imports
 */
import { ChatThreadsComponent } from './chat-threads.component';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';
import { AppStore } from '../appstate/app.store';
import { MockAppStore } from 'src/tests/app.store.mock';
import { QuotesService } from '../quotes.service';
import { MockQuotesService } from 'src/tests/quotes.service.mock';
import * as TestData from '../../tests/test.data';
import { SELECT_THREAD } from '../appstate/thread.actions';

describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;
  let origJasmineTimeout: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatThreadsComponent,
        ChatThreadComponent
      ],
      providers: [
        { provide: AppStore, useClass: MockAppStore },
        { provide: QuotesService, useClass: MockQuotesService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // increase timeout to 15secs since one of the test has to wait for 10secs
    origJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;

    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => { 
    // resets jasmine default timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = origJasmineTimeout;
  });

  /**
   * Instantiate
   */
  it('should create with all dependencies', () => {
    expect(component).toBeTruthy();

    // get app store
    const appStore: any = fixture.debugElement.injector.get(AppStore);
    expect(appStore).toBeTruthy();

    // get quotesSvc
    const quotesSvc: any = fixture.debugElement.injector.get(QuotesService);
    expect(quotesSvc).toBeTruthy();
  });

  /**
   * Displays 2x chat-thread
   */
  it('should display 2x chat-thread', () => { 
    // get app store
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // get chat-thread directives
    const cts: DebugElement[] = fixture.debugElement.queryAll(By.directive(ChatThreadComponent));

    expect(cts).toBeTruthy();
    expect(cts.length).toBe(2);
  });

  /**
   * Calls AppStore.dispatch() when onSelectThread() is called
   */
  it('should call AppStore.dispatch() when onSelectThread() is called', () => { 
    // appsstore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    // set dummy state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // spy on dispatch()
    const dispatchSpy = spyOn(appStore, 'dispatch');

    // call onSelectThread
    component.onSelectThread(TestData.thd2);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: SELECT_THREAD, thread: TestData.thd2 });
  });

  /**
   * Toggle enableRandomMessage flag based on Random Message checkbox
   */
  it('should toggle enableRandomMessage flag based on Random Message checkbox', () => {
    // get checkbox
    const el: DebugElement = fixture.debugElement.query(By.css('#customCheck1'));

    expect(el).toBeTruthy();

    // check checkbox
    el.nativeElement.checked = true;
    el.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.enableRandomMessage).toEqual(true);

    // uncheck checkbox
    el.nativeElement.checked = false;
    el.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.enableRandomMessage).toEqual(false);
  });

  /**
   * Trigger sendRandomMessage when Random Message checkbox is checked
   */
  it('should trigger sendRandomMessage when Random Message checkbox is checked', (done) => {
    // appsstore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    // set dummy state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // spy on dispatch()
    const dispatchSpy = spyOn(appStore, 'dispatch').and.callThrough();
    const sendRandomMessageSpy = spyOn(component, 'sendRandomMessage').and.callThrough();

    // get checkbox
    const el: DebugElement = fixture.debugElement.query(By.css('#customCheck1'));

    expect(el).toBeTruthy();

    // check checkbox
    el.nativeElement.checked = true;
    el.triggerEventHandler('click', null);

    setTimeout(() => {
      alert('case1(): ' + moment().toDate());
      expect(sendRandomMessageSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);

      // disable checkbox
      el.nativeElement.checked = false;
      el.triggerEventHandler('click', null);

      done();
    }, 11000);
  });

  /**
   * sendRandomMessage should not call dispatch() if Random Message checkbox is NOT checked
   */
  it('should not dispatch random message if Random Message checkbox is NOT checked', (done) => {
    // appsstore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    // set dummy state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // spy on dispatch()
    const dispatchSpy = spyOn(appStore, 'dispatch').and.callThrough();
    const sendRandomMessageSpy = spyOn(component, 'sendRandomMessage').and.callThrough();

    // get checkbox
    const el: DebugElement = fixture.debugElement.query(By.css('#customCheck1'));

    expect(el).toBeTruthy();

    // check checkbox
    el.nativeElement.checked = false;
    el.triggerEventHandler('click', null);

    setTimeout(() => {
      alert('case2(): ' + moment().toDate());

      expect(sendRandomMessageSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledTimes(0);

      done();
    }, 11000);
  });
});
