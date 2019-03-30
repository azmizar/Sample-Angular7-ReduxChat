/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';

/**
 * 3rd party imports
 */
import * as moment from 'moment';

/**
 * App imports
 */
import { environment } from '../../environments/environment';
import { HeaderComponent } from './header.component';
import { AppStore } from '../appstate/app.store';
import { MockAppStore } from 'src/tests/app.store.mock';
import { fullAppState } from 'src/tests/test.data';
import { getUnreadMessageCount } from '../appstate/threads.reducer';

/**
 * Unit tests for app-header
 */
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        { provide: AppStore, useClass: MockAppStore },
        Title
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // setup title
    const titleSvc = fixture.debugElement.injector.get(Title);
    titleSvc.setTitle('app-header unittest');

    fixture.detectChanges();
  });

  /**
   * Instantiate
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Display header title as "app-header unittest (ver: <version from environment>)"
   */
  it('should have "app-header unittest (ver: <environment.version>)" as part of the header title', () => { 
    const el: DebugElement = fixture.debugElement.query(By.css('#hdrTitle'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.innerHTML).toBe(`app-header unittest (ver: ${ environment.version })`);
  });

  /**
   * Display # of unread messages
   */
  it('should display number of unread messages', () => { 
    // set dummy state
    const appStore: any = fixture.debugElement.injector.get(AppStore);

    expect(appStore).toBeTruthy();

    appStore.setFakeState(fullAppState);
    fixture.detectChanges();

    // use selector to get number unread messages
    const unreadMsgsCount = getUnreadMessageCount(fullAppState);

    // get element that display count
    const el: DebugElement = fixture.debugElement.query(By.css('.badge'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.innerHTML).toBe(unreadMsgsCount.toString());
  });
});
