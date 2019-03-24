/**
 * Angular imports
 */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * App imports
 */
import * as TestData from '../../tests/test.data';
import { ChatThreadComponent } from './chat-thread.component';

/**
 * Unit test for chat-thread
 */
describe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  /**
   * Instantiate
   */
  it('should create', () => {
    let thd;

    // set to first thread
    thd = TestData.thd1;

    component.thread = thd;
    component.selectedThread = TestData.thd2;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  /**
   * Display thread1 (TestData) - not selected
   */
  it('should display thread 1 (not selected)', () => {
    let thd;

    // set to first thread
    thd = TestData.thd1;

    component.thread = thd;
    component.selectedThread = TestData.thd2;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    // get the DIV with col class which contains thread name
    let elem = el.query(By.css('.col'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.innerHTML).toMatch(thd.name);

    // get the DIV with bg-info - should not exist
    elem = el.query(By.css('.bg-info'));

    expect(elem).toBeFalsy();

    // get the IMG
    elem = el.query(By.css('img'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.src).toMatch(thd.avatarSrc);
  });

  /**
   * Display thread1 (TestData) - selected
   */
  it('should display thread 1 (selected)', () => {
    let thd;

    // set to first thread
    thd = TestData.thd1;

    component.thread = thd;
    component.selectedThread = thd;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    // get the DIV with col class which contains thread name
    let elem = el.query(By.css('.col'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.innerHTML).toMatch(thd.name);

    // get the DIV with bg-info - should exist
    elem = el.query(By.css('.bg-info'));

    expect(elem).toBeTruthy();

    // get the IMG
    elem = el.query(By.css('img'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.src).toMatch(thd.avatarSrc);
  });

  /**
   * Display thread2 (TestData) - not selected
   */
  it('should display thread 2 (not selected) after setting it to thread 1', () => {
    let thd;

    // set to first thread
    thd = TestData.thd1;

    component.thread = thd;
    component.selectedThread = thd;
    fixture.detectChanges();

    // set to second thread
    thd = TestData.thd2;

    component.thread = thd;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    // get the DIV with col class which contains thread name
    let elem = el.query(By.css('.col'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.innerHTML).toMatch(thd.name);

    // get the DIV with bg-info - should not exist
    elem = el.query(By.css('.bg-info'));

    expect(elem).toBeFalsy();

    // get the IMG
    elem = el.query(By.css('img'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.src).toMatch(thd.avatarSrc);
  });
});
