import { Message } from './message.model';

/**
 * Thread model (lightweight model)
 */
export interface Thread {
  id: string;
  name: string;
  avatarSrc: string;
  messages: Message[];
}
