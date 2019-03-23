/**
 * Angular imports
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * 3rd party imports
 */
import * as _ from 'lodash';

/**
 * Provides enumered values for quotes sources
 */
export enum QuotesSources {
  RonSwanson = 0,
  CorporateBS = 1,
  RandomJokes = 2
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  /**
   * Quotes sources:
   * https://ron-swanson-quotes.herokuapp.com/v2/quotes
   * https://corporatebs-generator.sameerkumar.website/
   * https://geek-jokes.sameerkumar.website/api
   */
  private _quotes: string[] = [
    'Strippers do nothing for me…but I will take a free breakfast buffet anytime, anyplace',
    'Holisticly Incubate Cutting-edge Roi',
    'Jesus can walk on water, but Chuck Norris can walk on Jesus',
    'Don\'t waste energy moving unless necessary',
    'Energistically Impact Leading-edge Relationships',
    'Chuck Norris is the only person in the world that can actually email a roundhouse kick'
  ];

  /**
   * Constructor
   */
  constructor(private _http: HttpClient) { }

  /**
   * Get random Ron Swanson quotes
   */
  private getQuoteFromRonSwanson(): Promise<string> {
    return new Promise<string>((res, rej) => { 
      try {
        this._http.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes').subscribe((resp: any) => { 
          res(resp[0]);
        }, (err) => { 
            rej(err);
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  /**
   * Get random corporate jargon quotes
   */
  private getQuoteFromCorporateJargons(): Promise<string> {
    return new Promise<string>((res, rej) => {
      try {
        this._http.get('https://corporatebs-generator.sameerkumar.website/').subscribe((resp: any) => {
          res(resp.phrase);
        }, (err) => {
          rej(err);
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  /**
   * Get random Chuck Noris quotes
   */
  private getQuoteFromCheckNoris(): Promise<string> {
    return new Promise<string>((res, rej) => {
      try {
        this._http.get('https://geek-jokes.sameerkumar.website/api').subscribe((resp: any) => {
          res(resp);
        }, (err) => {
          rej(err);
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  /**
   * Returns a random quote from quotes sources
   * @param src One of QuoteSources values. If omitted, it will be randomly selected
   */
  async getQuote(src?: QuotesSources) {
    const randInd: number = typeof(src) !== 'undefined' ? src : _.random(0, 2, false);

    switch (randInd) {
      case 0:
        return await this.getQuoteFromRonSwanson();
      
      case 1:
        return await this.getQuoteFromCorporateJargons();
        
      case 2:
        return await this.getQuoteFromCheckNoris();
    }
  }
}
