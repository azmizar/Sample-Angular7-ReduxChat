import { Component, OnInit, Input } from '@angular/core';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  @Input() selectedThread: Thread;

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Handles OnInit()
   */
  ngOnInit() { }

  /**
   * Returns if this thread is curently selected
   */
  isSelected(): boolean {
    return this.thread.id === this.selectedThread.id;
  }
}
