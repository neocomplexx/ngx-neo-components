import type { AfterViewInit, OnDestroy } from '@angular/core';
import { Directive, QueryList, ContentChildren, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Labeled, ListItemComponent } from './list-item.component';
import { ListService } from './list.service';
import { ICommand } from '@neocomplexx/ngx-neo-directives-mat';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[neoListKeydown]'
})
export class ListKeydownDirective implements AfterViewInit, OnDestroy {

  @ContentChildren(ListItemComponent, {descendants: true}) public items: QueryList<ListItemComponent<Labeled>>;
  @Input('neoListKeydown') htmlElement: ElementRef;
  @Input() icommand: ICommand;
  @Input() commandOnClick = true;
  @Input() commandOnEnter = true;
  @Input() typeAhead = true;
  @Input() typeAheadDelay = 300;
  @Input() linkedWithInputElem = false;

  private listenerFunction: Function;
  private focusFunction: Function;

  private subs = new Subscription();

  constructor(private renderer: Renderer2, private listService: ListService) { }

  ngAfterViewInit() {
    this.addKeyManagerListener();

    this.initPreselectedIndex();

    this.addClickManagerListener();

    this.listService.icommand = this.icommand;
    this.listService.commandOnClick = this.commandOnClick;
    this.listService.commandOnEnter = this.commandOnEnter;
    this.listService.htmlInputElement = this.htmlElement;
    this.listService.linkedWithInputElem = this.linkedWithInputElem;
  }


  private addKeyManagerListener(): void {
    if (this.typeAhead) {
      this.listService.keyManager = new ActiveDescendantKeyManager(this.items)
        .withWrap()
        .withTypeAhead(this.typeAheadDelay);
    } else {
      this.listService.keyManager = new ActiveDescendantKeyManager(this.items)
        .withWrap();
    }
    if (this.htmlElement) {
      // Renderer return function to destroy listener
      this.listenerFunction = this.renderer.listen(this.htmlElement, 'keydown', (event: KeyboardEvent) => {
        this.listService.keyListenerFunc(event);
      });

      this.focusFunction = this.renderer.listen(this.htmlElement, 'focus', (event: FocusEvent) => {
        this.listService.keyManager.setActiveItem(-1);
      });

    } else {
      throw Error('htmlInput listener was not setted in neoListKeydown');
    }
  }

  private initPreselectedIndex(): void {
    this.listService.itemsLength = this.items.length;
    // If the list is loaded on init, we select the elment and set preSelect to null so it's not used again on change event.
    if (this.listService.preSelectIndex != null && this.listService.preSelectIndex < this.items.length) {
      this.selectItem();
    }

    // We need to set selected index in change event because list can be async loaded
    this.subs.add(
      this.items.changes.subscribe(() => {
        this.listService.itemsLength = this.items.length;
        if (this.listService.preSelectIndex != null && this.listService.preSelectIndex < this.items.length) {
          this.selectItem();
        }
      }));
  }

  private addClickManagerListener() {
    this.subs.add(this.listService.clickedObservable.subscribe((item) => {
      const clickedItem = this.items.find(x => x.item === item);
      this.listService.keyManager.setActiveItem(clickedItem);
      this.listService.emitSelectedIndex();
      if (this.listService.commandOnClick) {
        this.listService.executeCommand();
      }
    }));
  }

  private selectItem(): void {
    setTimeout(() => {
      this.listService.keyManager.setActiveItem(this.listService.preSelectIndex);
      this.listService.preSelectIndex = null;
    }, 0);
  }

  ngOnDestroy() {
    this.listenerFunction();
    this.focusFunction();
    this.subs.unsubscribe();
  }
}
