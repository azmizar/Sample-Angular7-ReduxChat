/**
 * Angular imports
 */
import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

/**
 * App imports
 */
import { QuotesService, QuotesSources } from './quotes.service';

/**
 * Unit test for QuotesService using inject() and fakeAsync() so that we don't have to worry about async operations
 */
describe('QuotesService', () => {
  let httpTestingController: HttpTestingController;

  // setup testbed
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuotesService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  // clean up test bed
  afterEach(() => {
    httpTestingController.verify();
  });

  /**
   * Test instance creation
   */
  it('should be created', inject([QuotesService], (quotesSvc) => { 
    expect(quotesSvc).toBeTruthy();
  }));

  /**
   * Test retrieving a quote from random source.
   */
  it('should return "Quote 1" from random quote source', inject([QuotesService], fakeAsync((quotesSvc) => {
    // get quote
    let quote;
    quotesSvc.getQuote().then((val: string) => {
      quote = val;
    }).catch((err) => {
      throw err;
    });

    // mock HTTP backend so that we can control data since each
    // APIs return different format
    let data: any;

    const req = httpTestingController.match((request: HttpRequest<any>): boolean => {
      let validReq: boolean = false;

      // setup expected data based on the URL
      if (request.url.match(/swanson/)) {
        alert('API: Ron Swanson');
        validReq = true;
        data = ['Quote 1'];
      } else if (request.url.match(/corporatebs/)) {
        alert('API: Corporate BS');
        validReq = true;
        data = { phrase: 'Quote 1' };
      } else if (request.url.match(/geek/)) {
        alert('API: Jokes');
        validReq = true;
        data = 'Quote 1';
      } else {
        validReq = false;
        data = null;
      }

      return ((validReq) && (request.method === 'GET'));
    });

    // flush expected data
    req[0].flush(data);

    tick();

    // expect 1 call to be made
    expect(req.length).toBe(1);
    expect(quote).toBe('Quote 1');
  })));

  /**
   * Test retrieving a quote from Ron Swanson source.
   */
  it('should return "Quote 1" from Ron Swanson source', inject([QuotesService], fakeAsync((quotesSvc) => {
    // get quote
    let quote;
    quotesSvc.getQuote(QuotesSources.RonSwanson).then((val: string) => {
      quote = val;
    }).catch((err) => {
      throw err;
    });

    // mock HTTP backend so that we can control data since each
    // APIs return different format
    let data: any;

    const req = httpTestingController.match((request: HttpRequest<any>): boolean => {
      let validReq: boolean = false;

      // setup expected data based on the URL
      if (request.url.match(/swanson/)) {
        alert('API: Ron Swanson');
        validReq = true;
        data = ['Quote 1'];
      } else {
        validReq = false;
        data = null;
      }

      return ((validReq) && (request.method === 'GET'));
    });

    // flush expected data
    req[0].flush(data);

    tick();

    // expect 1 call to be made
    expect(req.length).toBe(1);
    expect(quote).toBe('Quote 1');
  })));

  /**
   * Test retrieving a quote from Corporate BS source.
   */
  it('should return "Quote 1" from Corporate BS quote source', inject([QuotesService], fakeAsync((quotesSvc) => {
    // get quote
    let quote;
    quotesSvc.getQuote(QuotesSources.CorporateBS).then((val: string) => {
      quote = val;
    }).catch((err) => {
      throw err;
    });

    // mock HTTP backend so that we can control data since each
    // APIs return different format
    let data: any;

    const req = httpTestingController.match((request: HttpRequest<any>): boolean => {
      let validReq: boolean = false;

      // setup expected data based on the URL
      if (request.url.match(/corporatebs/)) {
        alert('API: Corporate BS');
        validReq = true;
        data = { phrase: 'Quote 1' };
      } else {
        validReq = false;
        data = null;
      }

      return ((validReq) && (request.method === 'GET'));
    });

    // flush expected data
    req[0].flush(data);

    tick();

    // expect 1 call to be made
    expect(req.length).toBe(1);
    expect(quote).toBe('Quote 1');
  })));

  /**
   * Test retrieving a quote from Random Jokes source.
   */
  it('should return "Quote 1" from Random Jokes quote source', inject([QuotesService], fakeAsync((quotesSvc) => {
    // get quote
    let quote;
    quotesSvc.getQuote(QuotesSources.RandomJokes).then((val: string) => {
      quote = val;
    }).catch((err) => {
      throw err;
    });

    // mock HTTP backend so that we can control data since each
    // APIs return different format
    let data: any;

    const req = httpTestingController.match((request: HttpRequest<any>): boolean => {
      let validReq: boolean = false;

      // setup expected data based on the URL
      if (request.url.match(/geek/)) {
        alert('API: Jokes');
        validReq = true;
        data = 'Quote 1';
      } else {
        validReq = false;
        data = null;
      }

      return ((validReq) && (request.method === 'GET'));
    });

    // flush expected data
    req[0].flush(data);

    tick();

    // expect 1 call to be made
    expect(req.length).toBe(1);
    expect(quote).toBe('Quote 1');
  })));
});
