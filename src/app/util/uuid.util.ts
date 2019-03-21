/**
 * 3rd party import
 */
import { v4 as uuid } from 'uuid';

/**
 * Return UUID
 */
export function generateUUID(): string {
  return uuid();
}
