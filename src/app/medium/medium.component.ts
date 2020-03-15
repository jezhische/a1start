import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {from, interval, Observable, of, ReplaySubject} from 'rxjs';
import {delay, filter, map, scan, takeUntil, withLatestFrom} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {STRING_TYPE} from '@angular/compiler';
import {GithubService} from '../service/githubService/github.service';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css']
})
export class MediumComponent implements OnInit, OnDestroy {
  destroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  // home = 'back to home page';
  @Input() home: string;
  mediumOriginPage = 'go to medium origin page with all the stuff';
  mediumRxJSPracticeOriginPage = 'go to medium RxJS practice origin page';
  flatMapSwitchMap = 'go to Becoming more reactive with RxJS flatMap and switchMap origin page';
  output: any;

  //  https://www.learnrxjs.io/learn-rxjs/operators/filtering/takeuntil
// emit value every 1s
  source = interval(500);
  // only allow values that are even
  evenSource = this.source.pipe(filter(item => this.isEven(item)));
  // keep a running total of the number of even numbers out
  evenNumberCount = this.evenSource.pipe(scan((acc, _) => acc + 1, 0));
  // do not emit until 5 even numbers have been emitted
  fiveEvenNumbers = this.evenNumberCount.pipe(filter(val => val > 5));
  example = this.evenSource.pipe(
    // also give me the current even number count for display
    withLatestFrom(this.evenNumberCount),
    map(([val, count]) => `Even number (${count}) : ${val}`),
    // when five even numbers have been emitted, complete source observable
    takeUntil(this.fiveEvenNumbers)
  );
  evenDiv: any;

  constructor(@Inject(DOCUMENT) private document,
              @ViewChild('even', {static: false}) private evenElement: ElementRef,
              private githubService: GithubService) { }
  ngOnInit() {
    this.evenDiv = this.evenElement.nativeElement.appendChild(this.document.createElement('div'));
    this.evenDiv.setAttribute('id', 'evenSubscription');
  }
  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  /*
    Even number (1) : 0,
    Even number (2) : 2
    Even number (3) : 4
    Even number (4) : 6
    Even number (5) : 8
*/
  evenSubscribe = () => this.example.subscribe(val => {
    const htmlParagraphElement = this.document.createElement('p');
    htmlParagraphElement.innerHTML = val;
    // this.renderer.appendChild(this.evenElement, htmlParagraphElement);

    this.evenDiv.appendChild(htmlParagraphElement);

    console.log(val);
  })
// is number even?
  isEven = val => val % 2 === 0;

  load(): Observable<number | number[]> {
    // return of([1, 2, 3]).pipe(delay(1000));
    return from([1, 2, 3]).pipe(delay(500));
  }
  reset() {
    this.output = null;
    this.evenDiv.innerHTML = null;
  }

  loadToOutput() {
    this.load().pipe(takeUntil(this.destroy$)).subscribe(nextVal => this.output = nextVal);
  }
}
