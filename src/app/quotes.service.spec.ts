/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

/**
 * App imports
 */
import { QuotesService } from './quotes.service';

/**
 * Unit test for QuotesService
 */
describe('QuotesService', () => {
  let httpTestingController: HttpTestingController;

  // setup test bed
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuotesService
      ]
    });

    // Http backend mock
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // clean up test bed
  afterEach(() => { 
    httpTestingController.verify();
  });

  /**
   * Test instance creation
   */
  it('should be created', () => {
    const service: QuotesService = TestBed.get(QuotesService);
    expect(service).toBeTruthy();
  });

  /**
   * Test retrieving a quote. Using done() since .getQuote() is a promise.
   */
  it('should return "Quote 1"', (done) => { 
    // get service
    const service: QuotesService = TestBed.get(QuotesService);

    // get quote
    service.getQuote().then((val: string) => {
      expect(val).toBe('Quote 1');
      done();
    }).catch((err) => { 
      done();
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

    // expect 1 call to be made
    expect(req.length).toBe(1);

    // flush expected data
    req[0].flush(data);
  });
});
