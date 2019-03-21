/**
 * Angular import
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * App import
 */
import { Thread } from '../models/thread.model';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  @Input() selectedThread: Thread;
  @Output() selectThread: EventEmitter<Thread>;

  /**
   * Constructor
   */
  constructor() { 
    this.selectThread = new EventEmitter();
  }

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

  /**
   * Handles SELECT button click
   * @param event Event object
   */
  onSelectThreadClicked(event): void {
    this.selectThread.emit(this.thread);
  }
}
