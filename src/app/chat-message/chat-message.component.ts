/**
 * Angular import
 */
import { Component, OnInit, Input } from '@angular/core';

/**
 * App imports
 */
import { User } from '../models/user.model';
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
  constructor() { }

  /**
   * Handles OnInit()
   */
  ngOnInit() { }
}
