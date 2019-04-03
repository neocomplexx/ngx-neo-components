import { Directive, QueryList, AfterViewInit, ContentChildren, ElementRef, Input, Renderer, OnDestroy, HostListener } from '@angular/core';
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
  @Input() icommand: ICommand;
  @Input() commandOnClick = true;
  @Input() commandOnEnter = true;
  @Input() typeAheadDelay = 300;

  private listenerFunction: Function;

  private subs = new Subscription();

  constructor(private renderer: Renderer, private listService: ListService) { }

  ngAfterViewInit() {
    this.addKeyManagerListener();

    this.initPreselectedIndex();

    this.addClickManagerListener();

    this.listService.icommand = this.icommand;
    this.listService.commandOnClick = this.commandOnClick;
    this.listService.commandOnEnter = this.commandOnEnter;
  }


  private addKeyManagerListener(): void {
    this.listService.keyManager = new ActiveDescendantKeyManager(this.items)
    .withWrap()
    .withTypeAhead(this.typeAheadDelay);
    if (this.htmlElement) {
      // Renderer return function to destroy listener
      this.listenerFunction = this.renderer.listen(this.htmlElement, 'keydown', (event: KeyboardEvent) => {
       /*  event.preventDefault();
        event.stopPropagation(); */
        this.listService.keyListenerFunc(event);
      });
    } else {
      throw Error('htmlInput listener was not setted in neoListKeydown');
    }
  }

  private initPreselectedIndex(): void {
    this.listService.itemsLength = this.items.length;
    // If the list is loaded on init, we select the elment and set preSelect to null so it's not used again on change event.
    if (this.listService.preSelectIndex && this.listService.preSelectIndex < this.items.length) {
      this.selectItem();
    }

    // We need to set selected index in change event because list can be async loaded
    this.subs.add(
      this.items.changes.subscribe(() => {
        this.listService.itemsLength = this.items.length;
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
      if (this.listService.commandOnClick) {
        this.listService.executeCommand();
      }
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
