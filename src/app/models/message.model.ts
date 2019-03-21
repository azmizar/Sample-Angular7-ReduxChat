/**
 * App imports
 */
import { User } from './user.model';
import { Thread } from './thread.model';

/**
 * Message model (lightweight model)
 */
export interface Message {
  id?: string;
  sentAt?: Date;
  isRead?: boolean;
  text: string;
  author: User;
  thread?: Thread;
}
