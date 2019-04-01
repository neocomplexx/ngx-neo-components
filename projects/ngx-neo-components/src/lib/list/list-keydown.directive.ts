import { Directive, QueryList, AfterViewInit, ContentChildren, ElementRef, Input, Renderer, OnDestroy } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Labeled, ListItemComponent } from './list-item.component';
import { ListService } from './list.service';
import { ICommand } from '@neocomplexx/ngx-neo-directives';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[neoListKeydown]'
})
export class ListKeydownDirective implements AfterViewInit, OnDestroy {

  @ContentChildren(ListItemComponent) public items: QueryList<ListItemComponent<Labeled>>;
  @Input('neoListKeydown') htmlElement: ElementRef;
  @Input() command: ICommand;

  private listenerFunction: Function;

  private subs = new Subscription();

  constructor(private renderer: Renderer, private listService: ListService) { }

  ngAfterViewInit() {
    this.addKeyManagerListener();

    this.initPreselectedIndex();

    this.addClickManagerListener();

    this.listService.command = this.command;
  }


  private addKeyManagerListener(): void {
    this.listService.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
    if (this.htmlElement) {
      // Renderer return function to destroy listener
      this.listenerFunction = this.renderer.listen(this.htmlElement, 'keydown', (event: KeyboardEvent) => {
        this.listService.keyListenerFunc(event, this.items.length);
      });
    } else {
      throw Error('htmlInput listener was not setted in neoListKeydown');
    }
  }

  private initPreselectedIndex(): void {
    // If the list is loaded on init, we select the elment and set preSelect to null so it's not used again on change event.
    if (this.listService.preSelectIndex && this.listService.preSelectIndex < this.items.length) {
      this.selectItem();
    }

    // We need to set selected index in change event because list can be async loaded
    this.subs.add(
      this.items.changes.subscribe(() => {
        if (this.listService.preSelectIndex) {
          if (this.listService.preSelectIndex < this.items.length) {
            this.selectItem();
          }
        }
      }));
  }

  private addClickManagerListener() {
    this.subs.add(this.listService.clickedObservable.subscribe((item) => {
      const clickedItem = this.items.find(x => x.item === item);
      this.listService.keyManager.setActiveItem(clickedItem);
    }));
  }

  private selectItem(): void {
    setTimeout(() => {
      this.listService.keyManager.setActiveItem(this.listService.preSelectIndex);
      this.listService.preSelectIndex = null;
    }, 1);
  }

  ngOnDestroy() {
    this.listenerFunction();
    this.subs.unsubscribe();
  }
}
