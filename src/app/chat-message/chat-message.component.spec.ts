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
import { ChatMessageComponent } from './chat-message.component';

/**
 * Unit test for chat-message compoment
 */
describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  /**
   * Instantiate and detect message changes
   */
  it('should create and detect message changes', () => {
    let msg;

    // sets message input w/ Msg1 from test data
    msg = TestData.msg1;

    component.message = msg;
    fixture.detectChanges();

    // checking here just to make sure component has data and nothing is broken
    expect(component).toBeTruthy();

    // get the DIV with col class which contains the message text and sentAt
    let elem = el.query(By.css('.col'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.innerHTML).toMatch(msg.text);

    // get the IMG
    elem = el.query(By.css('img'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.src).toMatch(msg.author.avatarSrc);

    // change to Msg3
    msg = TestData.msg3;

    component.message = msg;
    fixture.detectChanges();

    // get the DIV with col class which contains the message text and sentAt
    elem = el.query(By.css('.col'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.innerHTML).toMatch(msg.text);

    // get the IMG
    elem = el.query(By.css('img'));

    expect(elem).toBeTruthy();
    expect(elem.nativeElement.src).toMatch(msg.author.avatarSrc);
  });
});
