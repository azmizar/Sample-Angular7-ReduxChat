/**
 * 3rd party imports
 */
import * as _ from 'lodash';

/**
 * App imports
 */
import { QuotesSources } from 'src/app/quotes.service';

/**
 * Mock for QuotesService
 */
export class MockQuotesService {

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Get random quote
   * @param src One of quote sources
   */
  async getQuote(src?: QuotesSources) {
    const randInd: number = typeof (src) !== 'undefined' ? src : _.random(0, 2, false);

    switch (randInd) {
      case 0:
        return 'Quote from Ron Swanson';

      case 1:
        return 'Quote from Corporate BS';

      case 2:
        return 'Quote from Random Joke';
    }
  }
}