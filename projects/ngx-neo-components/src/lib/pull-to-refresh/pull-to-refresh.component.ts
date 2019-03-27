import { Component } from '@angular/core';
import { Observable, fromEvent, timer, defer } from 'rxjs';
import { take, switchMap, map, repeat, tap, takeUntil, concat, takeWhile, merge, startWith, debounceTime } from 'rxjs/operators';
import { HeaderService } from '../header/header.service';


@Component({
  selector: 'neo-pull-to-refresh',
  template: `
    <div style="position: absolute; top: 0; left: 50%; z-index: 999">
      <div style="margin-left: -35px" [style.transform]="positionTranslate3d$ | async">
        <svg width="70px" height="70" [style.transform]="rotateTransform$ | async">
          <circle cy="15" cx="35" r="10" fill="#e7b015"></circle>
        </svg>
      </div>
    </div>
  `
})
export class PullToRefreshComponent {

  currentPos = 0;

  completeAnimation$ = this.headerService.loadComplete.pipe(
    map(() => this.currentPos),
    switchMap(currentPos => this.tweenObservable(currentPos, 0, 200))
  );

  touchstart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchend$ = fromEvent<TouchEvent>(document, 'touchend');
  touchmove$ = fromEvent<TouchEvent>(document, 'touchmove');

  returnPosition$ = timer(0, 10).pipe(take(20));

  drag$ = this.touchstart$.pipe(
    switchMap(start => {
      tap(console.log);
      let pos = 0;
      return this.touchmove$.pipe(
        map(move => move.touches[0].pageY - start.touches[0].pageY),
        tap(p => pos = p),
        takeUntil(this.touchend$),
        concat(defer(() => this.tweenObservable(pos, 0, 200)))
      );
    }),
    tap(p => {
      if (p >= window.innerHeight / 2) {
        this.headerService.requestLoad.next();
      }
    }),
    takeWhile(p => p < 70),
    repeat()
  );

  position$: Observable<number> = this.drag$.pipe(
    merge(this.completeAnimation$),
    startWith(0),
    tap(pos => this.currentPos = pos)
  );


  positionTranslate3d$: Observable<string> = this.position$.pipe(map(p => `translate3d(0, ${p - 250}px, 0)`));

  // Start rotating when a request is made and spin until it completes
  rotate$: Observable<number> = this.headerService.requestLoad.pipe(
    switchMap(() => {
      let rot = 0;
      return this.tweenObservable(0, 360, 500).pipe(
        repeat(),
        tap(r => rot = r),
        takeUntil(this.headerService.loadComplete),
        concat(defer(() => this.tweenObservable(rot, 360, 360 - rot))));
    })
  );

  rotateTransform$: Observable<string> = this.rotate$.pipe(map(r => `rotate(${r}deg)`));

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public headerService: HeaderService) { }

  private tweenObservable(start, end, time) {
    const emissions = time / 10;
    const step = (start - end) / emissions;
    return timer(0, 10).pipe(
      map(x => start - step * (x + 1)),
      take(emissions)
    );
  }
}
