import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, interval, Observable, of, Subject, Subscription} from 'rxjs';
import {GithubService} from '../../service/githubService/github.service';
import {delay, filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-medium-rxjs-practice',
  templateUrl: './medium-rxjs-practice.component.html',
  styleUrls: ['./medium-rxjs-practice.component.css']
})
export class MediumRxjsPracticeComponent implements OnInit, OnDestroy {
  title = 'medium-rxjs-practice works!';

  destroy$: Subject<boolean> = new Subject();
  requestStream: Observable<any>;
  responseStream: Observable<any>;
  output: any;
  subscription: Subscription;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.try1GetUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  try1GetUsers() {
    this.githubService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
          console.log('value: ' + value);
          this.responseStream = from(value)
            .pipe(filter((val, index) => index % 10 === 0))
            .pipe(delay(300))
            .pipe(takeUntil(this.destroy$));
          console.log('this.responseStream: ' + this.responseStream);
          this.responseStream.subscribe(obj => this.output = JSON.stringify(obj));
        }, error => console.log(error),
        () => console.log('complete'));
  }
  try2GetUsers() {
    this.githubService.getUsersResponseStreamFromRequestStream('https://api.github.com/users')
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.subscription = interval(1000)
        .pipe(map((timeFlash, index) => {
          console.log(`interval: timeFlash = ${timeFlash}, index = ${index}`);
          // 1 значение выдал интервал - и на втором значении отписались от него
          if (index > 0) { this.subscription.unsubscribe(); }}))
          // когда интервал выдает значение, выводим response на страницу
          .subscribe(() => this.addParagraph(response));
      });
  }
  private addParagraph(val: any) {
    const htmlParagraphElement = document.createElement('p');
    const divOutput = document.getElementById('output');
    console.log(divOutput);
    if (typeof val === 'string') {
      htmlParagraphElement.innerHTML = val;
      divOutput.appendChild(htmlParagraphElement);
    } else if (val instanceof Array) {
      val.forEach(item => {
        for (const key in item) {
        console.log(`${key}: ${item[key]}`);
        }
        htmlParagraphElement.innerHTML = JSON.stringify(item);
        divOutput.appendChild(htmlParagraphElement);
      });
    } else {console.log(`unknown type: ${JSON.stringify(val)}`); }
  }
}
