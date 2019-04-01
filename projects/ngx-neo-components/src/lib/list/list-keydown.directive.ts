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

  public keyManager: ActiveDescendantKeyManager<ListItemComponent<Labeled>>;

  private subs = new Subscription();

  constructor(private renderer: Renderer, private listService: ListService) { }

  ngAfterViewInit() {
    this.addKeyManagerListener();

    this.initPreselectedIndex();
  }


  private addKeyManagerListener() {
    this.keyManager = new ActiveDescendantKeyManager(this.items);
    if (this.htmlElement) {
      // Renderer return function to destroy listener
      this.listenerFunction = this.renderer.listen(this.htmlElement, 'keydown', (event: KeyboardEvent) => {
        if (this.keyManager) {
          const active = this.keyManager.activeItemIndex;
          switch (event.keyCode) {
            case 13:
              if (this.command) {
                if (this.keyManager.activeItem) {
                  this.command.execute(this.keyManager.activeItem.item);
                } else {
                  console.warn('Not selected item');
                }
              } else {
                console.warn('Command not set in list');
              }
              break;
            case 33:
              event.preventDefault();
              if (this.keyManager.activeItemIndex - 10 >= 0) {
                this.keyManager.setActiveItem(active - 10);
              } else {
                this.keyManager.setFirstItemActive();
              }
              break;
            case 34:
              event.preventDefault();
              if (this.keyManager.activeItemIndex + 10 < this.items.length) {
                this.keyManager.setActiveItem(active + 10);
              } else {
                this.keyManager.setLastItemActive();
              }
              break;
            case 35:
              this.keyManager.setLastItemActive();
              break;
            case 36:
              this.keyManager.setFirstItemActive();
              break;
            default:
              this.keyManager.onKeydown(event);
          }
          this.listService.activeObservable.next(this.keyManager.activeItemIndex);
        } else {
          throw Error('keyManager was not setted in neoListKeydown');
        }
      });
    } else {
      throw Error('htmlInput listener was not setted in neoListKeydown');
    }
  }

  private initPreselectedIndex() {
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

  private selectItem(): void {
    setTimeout(() => {
      this.keyManager.setActiveItem(this.listService.preSelectIndex);
      this.listService.preSelectIndex = null;
    }, 1);
  }

  ngOnDestroy() {
    this.listenerFunction();
    this.subs.unsubscribe();
  }
}
