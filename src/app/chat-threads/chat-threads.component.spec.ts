/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => { });

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

  xit('should trigger sendRandomMessage when Random Message checkbox is checked', fakeAsync(() => {
    // appsstore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    // set dummy state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // spy on dispatch()
    const dispatchSpy = spyOn(appStore, 'dispatch');

    // get checkbox
    const el: DebugElement = fixture.debugElement.query(By.css('#customCheck1'));

    expect(el).toBeTruthy();

    // check checkbox
    el.nativeElement.checked = true;
    el.triggerEventHandler('click', null);

    // advance by 10secs
    // tick(11000);
    jasmine.clock().tick(11000);

    // // disable checkbox
    // el.nativeElement.checked = false;
    // el.triggerEventHandler('click', null);

    // fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger sendRandomMessage when Random Message checkbox is checked', (done) => {
    // appsstore
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    // set dummy state
    appStore.setFakeState(TestData.fullAppState);

    fixture.detectChanges();

    // spy on dispatch()
    const dispatchSpy = spyOn(appStore, 'dispatch');

    // get checkbox
    const el: DebugElement = fixture.debugElement.query(By.css('#customCheck1'));

    expect(el).toBeTruthy();

    // check checkbox
    el.nativeElement.checked = true;
    el.triggerEventHandler('click', null);


    // // disable checkbox
    // el.nativeElement.checked = false;
    // el.triggerEventHandler('click', null);

    // fixture.detectChanges();

    setTimeout(() => { 
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      done();
    }, 5000);
  });
});
