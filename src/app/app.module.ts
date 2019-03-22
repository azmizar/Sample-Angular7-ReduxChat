/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/**
 * App imports
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { appStoreProviders } from './appstate/app.store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatWindowComponent,
    ChatMessagesComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    appStoreProviders,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }