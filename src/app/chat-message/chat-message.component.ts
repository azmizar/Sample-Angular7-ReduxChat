/**
 * Angular import
 */
import { Component, OnInit, Input, ElementRef } from '@angular/core';

/**
 * App imports
 */
import { Message } from '../models/message.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;

  /**
   * Constructor
   */
  constructor(private _el: ElementRef) { }

  /**
   * Handles OnInit()
   */
  ngOnInit() { 
    // scroll this item into view so that it appears at the bottom of the viewport
    setTimeout(() => { this._el.nativeElement.scrollIntoView(true); });
  }
}
