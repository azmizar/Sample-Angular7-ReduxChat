/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

/**
 * App imports
 */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { appStoreProviders } from './appstate/app.store';

/**
 * Unit tests for AppComponent
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        ChatThreadsComponent,
        ChatWindowComponent,
        ChatThreadComponent,
        ChatMessagesComponent,
        ChatMessageComponent
      ],
      providers: [
        appStoreProviders,
        Title
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test component creation
   */
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test document title (this is set within AppComponent constructor)
   */
  it(`should have as title 'Angular7 Sample: Chat App with Redux'`, () => {
    expect(component.title).toEqual('Angular7 Sample: Chat App with Redux');
  });

  /**
   * Display app-header
   */
  it('should render app-header', () => { 
    const el: DebugElement = fixture.debugElement.query(By.directive(HeaderComponent));

    expect(el).toBeTruthy();
  });

  /**
   * Display chat-threads
   */
  it('should render chat-threads', () => {
    const el: DebugElement = fixture.debugElement.query(By.directive(ChatThreadsComponent));

    expect(el).toBeTruthy();
  });

  /**
   * Display chat-window
   */
  it('should render chat-window', () => {
    const el: DebugElement = fixture.debugElement.query(By.directive(ChatWindowComponent));

    expect(el).toBeTruthy();
  });
});
