/**
 * Angular imports
 */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule, Title } from '@angular/platform-browser';

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

  /**
   * Test component creation
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test document title (this is set within AppComponent constructor)
   */
  it(`should have as title 'Angular7 Sample: Chat App with Redux'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular7 Sample: Chat App with Redux');
  });

  /**
   * Test title in the header (should be the same as what is set in the app)
   */
  it('should render title in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#hdrTitle').textContent).toContain(app.title);
  });
});
