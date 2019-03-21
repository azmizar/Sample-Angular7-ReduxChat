/**
 * 3rd party import
 */
import { v4 as uuid } from 'uuid';

export function generateUUID(): string {
  return uuid();
}
