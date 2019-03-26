/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Angular 3rd party
 */

/**
 * App imports
 */
import * as TestData from '../../tests/test.data';
import { ChatMessagesComponent } from './chat-messages.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { AppStore, appStoreProviders } from '../appstate/app.store';
import { MockAppStore } from 'src/tests/app.store.mock';

/**
 * Unit test for chat-messges
 */
describe('ChatMessagesComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatMessagesComponent,
        ChatMessageComponent
      ],
      providers: [
        { provide: AppStore, useClass: MockAppStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Instantiate
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Repeat 2x chat-message
   */
  it('should repeat 2x chat-message component', () => { 
    // get app store
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    // set our fake app state
    appStore.setFakeState(TestData.fullAppState);
    fixture.detectChanges();

    // get element(s)
    const el: DebugElement[] = fixture.debugElement.queryAll(By.directive(ChatMessageComponent));

    expect(el).toBeTruthy();
    expect(el.length).toBe(2);
  });
});
